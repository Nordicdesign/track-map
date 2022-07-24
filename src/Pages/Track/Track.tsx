import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'

import { AddNewObservation, AddNewCorner } from '../../Components/AddNew'
import {
  ObservationList,
  NoObservations,
} from '../../Components/ObservationList'
import { CornersList, NoCorners } from '../../Components/CornersList'
import {
  recordObservation,
  editObservation,
  recordCorner,
  deleteEntry,
  detachListener,
  renameSession,
  loadData,
  newSession,
} from '../../Utils/Data'
import SessionSelection from '../../Components/SessionSelection'
import { UserContext } from '../../providers/UserProvider'
import tracksJson from '../../constants/tracks.json'
import { NoTrack } from './components/NoTrack'
import { Guest } from './components/Guest'
import { CornerType, NoteType, SessionType } from '../../Utils/types'

type TrackParams = {
  trackName: string
}

const tracks: any = tracksJson

export const Track = () => {
  // for the context API
  const user = useContext(UserContext)
  const { trackName } = useParams<TrackParams>()

  // initialize the state
  const [trackExists, setTrackExists] = useState(false)
  const [authUser, setAuthUser] = useState<string | null>(null)
  // const [error, setError] = useState(null);
  const [sessions, setSessions] = useState<SessionType[] | null>(null)
  const [sessionName, setSessionName] = useState<string>()
  const [currentSession, setCurrentSession] = useState<string | null>(null)
  const [corners, setCorners] = useState<CornerType[] | null>(null)
  const [observations, setObservations] = useState<any>(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const [visibleNotesForm, setVisibleNotesForm] = useState(false)
  const [visibleCornerForm, setVisibleCornerForm] = useState(false)
  const [currentId, setCurrentId] = useState('')
  const [trackID, setTrackID] = useState(trackName)

  const handleAdd = (type: string) => {
    if (type === 'notes') setVisibleNotesForm(true)
    else if (type === 'corner') setVisibleCornerForm(true)
  }

  const handleCancel = (type: string) => {
    if (type === 'notes') setVisibleNotesForm(false)
    else if (type === 'corner') setVisibleCornerForm(false)
  }

  const addOrEdit = (obj: { notes: NoteType; setupName: string }) => {
    if (!authUser) {
      return
    }

    setVisibleNotesForm(false)
    const date = new Date()
    const obs = {
      notes: obj.notes,
      setupName: obj.setupName,
      time: date.getTime(),
    }

    if (currentId === '') {
      recordObservation(authUser, trackID, currentSession, obs)
    } else {
      editObservation(authUser, trackID, currentSession, currentId, obs)
      setCurrentId('')
    }
  }

  const addOrEditCorner = (corner: CornerType, notes: NoteType) => {
    setVisibleCornerForm(false)
    const obs = { notes }
    recordCorner(authUser, trackID, currentSession, corner, obs)
    setCurrentId('')
  }

  const handleRenameSession = (value: any) => {
    renameSession(authUser, trackID, currentSession, value)
  }

  const handleNewSession = (value: any) => {
    newSession(authUser, trackID, value)
  }

  const handleDelete = (type: any, id: string) => {
    if (window.confirm(`Are you sure to delete this entry`)) {
      deleteEntry(authUser, trackID, currentSession, type, id)
    }
  }

  const changeSession = (e: { target: { value: any } }) => {
    if (!sessions) {
      return
    }

    const newSession = e.target.value
    // the new session to load
    const newState = sessions.filter((session) => session.id === newSession)
    const corners = newState.map((session) => session.corners).pop()
    const observations = newState
      .map((session) => {
        return session.observations
      })
      .pop()

    // if(!turns) { // in case there's no data in firebase
    //   turns = []
    // }
    // load in state
    setCurrentSession(newSession)
    if (corners !== undefined) {
      setCorners(corners)
    }
    setObservations(observations)
    console.log('turns loaded', observations)
  }

  const setTrackCurrentId = (type: string, id: any) => {
    setCurrentId(id)
    if (type === 'notes') setVisibleNotesForm(true)
    else if (type === 'corners') setVisibleCornerForm(true)
  }

  // on page mount
  useEffect(() => {
    // does the track exist?
    if (tracks.hasOwnProperty(trackName)) setTrackExists(true)

    // do we have a user?
    let loggedInUser
    user && (loggedInUser = user.user?.userID)

    // check if user exists in local storage for browser refresh
    const sessionUser = sessionStorage.getItem('authUser')
    sessionUser && (loggedInUser = sessionUser)

    if (loggedInUser && loggedInUser !== 'guest') {
      // ensure user is stored everywhere
      sessionStorage.setItem('authUser', loggedInUser)
      setAuthUser(loggedInUser)

      loadData({
        authUser: loggedInUser,
        trackID: trackID,
        onResult: (values: {
          sessions: SessionType[]
          currentSession: SessionType[]
          observations: any
          corners: any
        }) => {
          console.log('the values:', values)
          setSessions(values.sessions)
          setCurrentSession(values.currentSession[0].id)
          setObservations(values.observations)
          setCorners(values.corners)
          setDataIsReady(true)
        },
      })
    }

    // componentWillUnmount
    return () => {
      // console.log("unmounted");
      // this.setState({...initial_load})
      detachListener({ authUser: authUser, trackID: trackID })
    }
  }, [])

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('authUser')
    // clear the authUser when the user logs out
    if (authUser !== null && user === 'guest' && !sessionUser) {
      console.log('doom and gloom!')
      setAuthUser(null)
      sessionStorage.clear()
    }
  }, [authUser])

  useEffect(() => {
    if (!sessions) {
      return
    }

    const found = sessions.find((session) => session.id === currentSession)
    if (typeof found !== 'undefined') {
      setSessionName(found.name)
    }
  }, [currentSession, sessions])

  return trackExists ? (
    <div className="track-wrapper">
      <div className="track-meta">
        <h1>{tracks[trackName].name}</h1>

        {authUser ? (
          <SessionSelection
            sessions={sessions}
            currentSession={currentSession}
            changeSession={changeSession}
            renameSession={renameSession}
            newSession={newSession}
          />
        ) : null}
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
      {authUser ? (
        <div className="track-session">
          <h2>Session</h2>
          <p>{sessionName}</p>
        </div>
      ) : null}

      <div className="track-notes">
        {authUser ? (
          <>
            <div className="track-observations">
              <div className="track-observations-header">
                <h3>Setup notes</h3>
                <button onClick={() => handleAdd('notes')}>Add new</button>
              </div>

              {visibleNotesForm ? (
                <AddNewObservation
                  currentId={currentId}
                  addOrEdit={addOrEdit}
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
                <button onClick={() => handleAdd('corner')}>Add new</button>
              </div>

              {visibleCornerForm ? (
                <AddNewCorner
                  currentId={currentId}
                  addOrEditCorner={addOrEditCorner}
                  corners={corners}
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
                          setTrackCurrentId={setTrackCurrentId}
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
  ) : (
    <NoTrack />
  )
}
