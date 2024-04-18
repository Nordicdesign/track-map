import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { AddNewCorner } from './components/corners/AddNewCorner'
import { AddNewSetupNote } from './components/AddNewSetupNote'
import { ObservationList, NoObservations } from './components/ObservationList'
import { NoCorners } from './components/corners/NoCorner'
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
import { SessionSelection } from './components/sessions/SessionSelection'
import tracksJson from '../../constants/tracks.json'
import { NoTrack } from './components/NoTrack'
import { Guest } from './components/Guest'
import { Corner, TypeOfEntry, Note, Session } from '../../app/utils/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { CornerList } from './components/corners/CornerList'

type TrackParams = {
  trackName: string
}

const tracks: any = tracksJson

export const Track = () => {
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
  const [corners, setCorners] = useState<Corner[] | null>(null)
  const [observations, setObservations] = useState<any>(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const [visibleNotesForm, setVisibleNotesForm] = useState(false)
  const [visibleCornerForm, setVisibleCornerForm] = useState(false)
  const [currentId, setCurrentId] = useState('')

  const handleAdd = (type: TypeOfEntry) => {
    if (type === TypeOfEntry.observations) setVisibleNotesForm(true)
    else if (type === TypeOfEntry.corners) setVisibleCornerForm(true)
  }

  const handleCancelCorner = () => setVisibleCornerForm(false)
  const handleCancelSetupNote = () => setVisibleNotesForm(false)

  const addOrEdit = (obj: { notes: Note; setupName: string }) => {
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
    setVisibleNotesForm(false)
  }

  const addOrEditCorner = (corner: Corner, notes: Note) => {
    if (!userID || !currentSession) return

    setVisibleCornerForm(false)
    const obs = { notes }
    recordCorner(userID, trackName, currentSessionId, corner, obs)
    setCurrentId('')
  }

  const handleRenameSession = (value: string) => {
    if (!userID) return
    renameSession(userID, trackName, currentSessionId, value)
  }

  const handleNewSession = (value: string) => {
    if (!userID) return
    newSession(userID, trackName, value)
  }

  const handleDelete = (type: keyof typeof TypeOfEntry, id: string) => {
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

  const setTrackCurrentId = (type: keyof typeof TypeOfEntry, id: string) => {
    setCurrentId(id)
    if (type === 'observations') setVisibleNotesForm(true)
    else if (type === 'corners') setVisibleCornerForm(true)
  }

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
    }

    return () => detachListener({ authUser: userID, trackID: trackName })
  }, [trackName, userID])

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
  // eslint-disable-next-line no-prototype-builtins
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
            <a href={tracks[trackName].imgCC} target="_blank" rel="noreferrer">
              {tracks[trackName].imgAuthor}
            </a>
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
                <button onClick={() => handleAdd(TypeOfEntry.observations)}>
                  Add new
                </button>
              </div>

              {visibleNotesForm ? (
                <AddNewSetupNote
                  currentId={currentId}
                  addOrEdit={addOrEdit}
                  observations={observations}
                  handleCancel={handleCancelSetupNote}
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
                <button onClick={() => handleAdd(TypeOfEntry.corners)}>
                  Add new
                </button>
              </div>

              {visibleCornerForm ? (
                <AddNewCorner
                  currentId={currentId}
                  addOrEditCorner={addOrEditCorner}
                  corners={corners}
                  handleCancel={handleCancelCorner}
                />
              ) : (
                <div>
                  {corners ? (
                    <CornerList
                      corners={corners}
                      setTrackCurrentId={setTrackCurrentId}
                      handleDelete={handleDelete}
                    />
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
