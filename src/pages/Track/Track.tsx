import react, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { ObservationList, NoObservations } from './components/ObservationList'
import { CornersList, NoCorners } from './components/CornersList'
import {
  recordObservation,
  editObservation,
  recordCorner,
  deleteEntry,
  detachListener,
  renameSession,
  loadData,
  newSession,
} from '../../app/utils/data'
import { SessionSelection } from './components/SessionSelection'
import tracksJson from '../../constants/tracks.json'
import { NoTrack } from './components/NoTrack'
import { Guest } from './components/Guest'
import {
  Corners,
  Entry,
  Session,
  TrackMetadataList,
} from '../../app/utils/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { ObservationForm } from './components/ObservationForm'
import { CornerForm } from './components/CornerForm'
import { useAppDispatch } from '../../app/hooks'
import { editCorner, finishEditing } from '../../app/tracks/tracksSlice'

type TrackParams = {
  trackName: string
}

const tracks: TrackMetadataList = tracksJson

export const Track: React.FC = () => {
  const userID = useSelector((state: RootState) => state.user.userID)
  const { trackName } = useParams<TrackParams>()
  const history = useHistory()

  if (!trackName) {
    history.push('/')
  }

  // initialize the state
  const [sessions, setSessions] = useState<Session[] | null>(null)
  const [sessionName, setSessionName] = useState<string>()
  const [currentSession, setCurrentSession] = useState<Session | null>(null)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [corners, setCorners] = useState<Corners | null>(null)
  const [observations, setObservations] = useState<any>(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const [visibleObservationsForm, setVisibleObservationsForm] = useState(false)
  const [visibleCornerForm, setVisibleCornerForm] = useState(false)
  const [currentId, setCurrentId] = useState('')
  const dispatch = useAppDispatch()

  const handleAdd = (type: Entry) => {
    dispatch(finishEditing())
    if (type === Entry.observations) setVisibleObservationsForm(true)
    else if (type === Entry.corners) setVisibleCornerForm(true)
  }

  const handleCancel = () => {
    setVisibleObservationsForm(false)
    setVisibleCornerForm(false)
  }

  const handleObservationChange = (obj: {
    notes: string
    setupName: string
  }) => {
    if (!userID || !currentSession) {
      return
    }

    const date = new Date()
    const obs = {
      notes: obj.notes,
      setupName: obj.setupName,
      time: date.getTime(),
    }

    if (currentId === '') {
      recordObservation(userID, trackName, currentSessionId, obs)
    } else {
      editObservation(userID, trackName, currentSessionId, currentId, obs)
      setCurrentId('')
    }
    setVisibleObservationsForm(false)
  }

  const addOrEditCorner = (corner: string, notes: string) => {
    if (!userID || !currentSession) return

    setVisibleCornerForm(false)
    const obs = { notes }
    recordCorner(userID, trackName, currentSessionId, corner, obs)
    // setCurrentId('')
    dispatch(finishEditing())
  }

  const handleEditCorner = (corner: string, notes: string) => {
    dispatch(editCorner({ corner, notes }))
    setVisibleCornerForm(true)
  }

  const handleRenameSession = (value: string) => {
    if (!userID) return
    renameSession(userID, trackName, currentSessionId, value)
  }

  const handleNewSession = (value: string) => {
    if (!userID) return
    newSession(userID, trackName, value)
  }

  const handleDelete = (type: keyof typeof Entry, id: string) => {
    if (!userID || !currentSession) return

    if (window.confirm(`Are you sure to delete this entry`)) {
      deleteEntry(userID, trackName, currentSessionId, type, id)
    }
  }

  const changeSession = (newSessionID: string) => {
    // the new session to load
    const newSession = sessions?.filter(
      (session) => session.id === newSessionID,
    )[0]
    const corners = newSession?.corners
    const observations = newSession?.observations
    const name = newSession?.name

    // load in state
    if (corners !== undefined) {
      setCorners(corners)
    } else {
      setCorners(null)
    }
    setObservations(observations)
    setSessionName(name)
    setCurrentSessionId(newSessionID)
  }

  const setTrackCurrentId = (type: keyof typeof Entry, id: string) => {
    setCurrentId(id)
    if (type === 'observations') setVisibleObservationsForm(true)
    else if (type === 'corners') setVisibleCornerForm(true)
  }

  // on page mount
  useEffect(() => {
    if (userID !== 'guest' && userID !== null && userID !== undefined) {
      loadData({
        authUser: userID,
        trackID: trackName,
        onResult: (sessions: Session[]) => {
          setSessions(sessions)
          setDataIsReady(true)
        },
      })
    } else {
      setDataIsReady(true)
    }

    return () => {
      if (userID !== 'guest' && userID !== null && userID !== undefined) {
        detachListener({ authUser: userID, trackID: trackName })
      }
    }
  }, [userID])

  useEffect(() => {
    let newSession: Session

    if (!sessions) {
      return
    }

    if (currentSessionId === null) {
      newSession = sessions.slice(-1)[0]
    } else {
      newSession = sessions.filter(
        (session) => session.id === currentSessionId,
      )[0]
    }

    setCurrentSession(newSession)
    if (typeof newSession !== 'undefined') {
      setSessionName(newSession.name)
    }

    if (newSession.corners !== undefined) {
      setCorners(newSession.corners)
    } else {
      setCorners(null)
    }
    setObservations(newSession.observations)
    setCurrentSessionId(newSession.id)
  }, [currentSessionId, sessions])

  // does the track exist?
  if (!tracks.hasOwnProperty(trackName)) {
    return <NoTrack />
  }

  return (
    <div className="track-wrapper">
      <div className="track-meta">
        {dataIsReady && (
          <>
            <h1>{tracks[trackName].name}</h1>
            <SessionSelection
              sessions={sessions}
              currentSessionId={currentSessionId}
              changeSession={changeSession}
              renameSession={handleRenameSession}
              newSession={handleNewSession}
            />
          </>
        )}
      </div>

      <div className="track-map">
        <img src={tracks[trackName].url} alt={tracks[trackName].name} />
        {tracks[trackName].imgAuthor && (
          <p>
            Image by{' '}
            <a href={tracks[trackName].imgCC}>{tracks[trackName].imgAuthor}</a>
          </p>
        )}
      </div>
      {userID ? (
        <div className="track-session">
          <h2>Session</h2>
          <p>{sessionName}</p>
        </div>
      ) : null}

      <div className="track-notes">
        {userID ? (
          <>
            <div className="track-observations">
              <div className="track-observations-header">
                <h3>Setup notes</h3>
                <button onClick={() => handleAdd(Entry.observations)}>
                  Add new
                </button>
              </div>

              {visibleObservationsForm ? (
                <ObservationForm
                  currentId={currentId}
                  handleObservationChange={handleObservationChange}
                  observations={observations}
                  handleCancel={handleCancel}
                />
              ) : (
                <div>
                  {observations ? (
                    Object.keys(observations)
                      .reverse()
                      .map((key) => (
                        <ObservationList
                          key={key}
                          id={key}
                          name={observations[key].time}
                          notes={observations[key].notes}
                          setupName={observations[key].setupName}
                          onDelete={handleDelete}
                          setTrackCurrentId={setTrackCurrentId}
                        />
                      ))
                  ) : (
                    <NoObservations />
                  )}
                </div>
              )}
            </div>

            <div className="track-corners">
              <div className="track-corners-header">
                <h3>Track notes</h3>
                {!visibleCornerForm && (
                  <button onClick={() => handleAdd(Entry.corners)}>
                    Add new
                  </button>
                )}
              </div>

              {visibleCornerForm ? (
                <CornerForm
                  addOrEditCorner={addOrEditCorner}
                  handleCancel={handleCancel}
                />
              ) : (
                <div>
                  {corners ? (
                    Object.entries(corners).map((corner, key: React.Key) => {
                      return (
                        <CornersList
                          key={key}
                          name={corner[0]}
                          notes={corner[1]}
                          onDelete={handleDelete}
                          // setTrackCurrentId={setTrackCurrentId}
                          handleEditCorner={handleEditCorner}
                        />
                      )
                    })
                  ) : (
                    <NoCorners />
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <Guest />
        )}
      </div>
    </div>
  )
}
