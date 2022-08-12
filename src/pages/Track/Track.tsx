import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { AddNewObservation, AddNewCorner } from './components/AddNew'
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
// import { NoTrack } from './components/NoTrack'
import { Guest } from './components/Guest'
import { CornerType, NoteType, SessionType } from '../../app/utils/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

type TrackParams = {
  trackName: string
}

const tracks: any = tracksJson

export const Track = () => {
  // for the context API
  const userEmail = useSelector((state: RootState) => state.user.userEmail)
  const userID = useSelector((state: RootState) => state.user.userID)
  const { trackName } = useParams<TrackParams>()
  const history = useHistory()

  if (!trackName) {
    history.push('/')
  }

  // initialize the state
  // const [authUser, setAuthUser] = useState<string | null>(null)
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

  const handleAdd = (type: string) => {
    if (type === 'notes') setVisibleNotesForm(true)
    else if (type === 'corner') setVisibleCornerForm(true)
  }

  const handleCancel = (type: string) => {
    if (type === 'notes') setVisibleNotesForm(false)
    else if (type === 'corner') setVisibleCornerForm(false)
  }

  const addOrEdit = (obj: { notes: NoteType; setupName: string }) => {
    if (!userID) {
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
      recordObservation(userID, trackName, currentSession, obs)
    } else {
      editObservation(userID, trackName, currentSession, currentId, obs)
      setCurrentId('')
    }
  }

  const addOrEditCorner = (corner: CornerType, notes: NoteType) => {
    setVisibleCornerForm(false)
    const obs = { notes }
    recordCorner(userID, trackName, currentSession, corner, obs)
    setCurrentId('')
  }

  // const handleRenameSession = (value: any) => {
  //   renameSession(userID, trackName, currentSession, value)
  // }

  // const handleNewSession = (value: any) => {
  //   newSession(userID, trackName, value)
  // }

  const handleDelete = (type: any, id: string) => {
    if (window.confirm(`Are you sure to delete this entry`)) {
      deleteEntry(userID, trackName, currentSession, type, id)
    }
  }

  const changeSession = (newSessionID: string) => {
    console.log('changing session')

    if (!sessions) {
      return
    }

    // the new session to load
    const newSession = sessions.filter((session) => session.id === newSessionID)

    // check if there's any data on that session
    const corners = newSession.map((session) => session.corners).pop()
    console.log(corners)

    const observations = newSession
      .map((session) => {
        return session.observations
      })
      .pop()

    console.log(observations)

    // if (!turns) {
    // in case there's no data in firebase
    //   turns = []
    // }
    // load in state
    if (corners !== undefined) {
      setCorners(corners)
    } else {
      setCorners(null)
    }
    setObservations(observations)
    setCurrentSession(newSessionID)
  }

  const setTrackCurrentId = (type: string, id: any) => {
    setCurrentId(id)
    if (type === 'notes') setVisibleNotesForm(true)
    else if (type === 'corners') setVisibleCornerForm(true)
  }

  // on page mount
  useEffect(() => {
    // does the track exist?
    if (!tracks.hasOwnProperty(trackName)) {
      history.push('/')
    }

    // do we have a user?
    // let loggedInUser
    // user && (loggedInUser = user.user?.userID)
    // check if user exists in local storage for browser refresh
    // const sessionUser = sessionStorage.getItem('authUser')
    // sessionUser && (loggedInUser = sessionUser)

    if (userID !== 'guest' && userID !== null && userID !== undefined) {
      // ensure user is stored everywhere
      // sessionStorage.setItem('authUser', loggedInUser)
      // setAuthUser(loggedInUser)

      loadData({
        authUser: userID,
        trackID: trackName,
        onResult: (values: {
          sessions: SessionType[]
          currentSession: SessionType[]
          observations: any
          corners: any
        }) => {
          console.log('the values:', values)
          const { sessions, currentSession, observations, corners } = values
          setSessions(sessions)
          setCurrentSession(currentSession[0].id)
          setObservations(observations)
          setCorners(corners)
          const found = sessions.find(
            (session) => session.id === currentSession[0].id,
          )
          if (typeof found !== 'undefined') {
            setSessionName(found.name)
          }
          setDataIsReady(true)
        },
      })
    }

    // componentWillUnmount
    return () => {
      // console.log("unmounted");
      // this.setState({...initial_load})
      detachListener({ authUser: userID, trackID: trackName })
    }
  }, [])

  // useEffect(() => {
  // const sessionUser = sessionStorage.getItem('authUser')
  // clear the authUser when the user logs out
  // if (userID !== null && userID === 'guest' && !sessionUser) {
  //   console.log('doom and gloom!')
  //   // setAuthUser(null)
  //   sessionStorage.clear()
  //   }
  // }, [userID])

  useEffect(() => {
    if (!sessions) {
      return
    }

    const found = sessions.find((session) => session.id === currentSession)
    if (typeof found !== 'undefined') {
      setSessionName(found.name)
    }
  }, [currentSession, sessions])

  return (
    <div className="track-wrapper">
      <div className="track-meta">
        <h1>{tracks[trackName].name}</h1>

        {dataIsReady && (
          <SessionSelection
            sessions={sessions}
            currentSession={currentSession}
            changeSession={changeSession}
            renameSession={renameSession}
            newSession={newSession}
          />
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
  )
}
