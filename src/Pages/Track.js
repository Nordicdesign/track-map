import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AddNewObservation, AddNewCorner } from '../Components/AddNew'
import { ObservationList, NoObservations } from '../Components/ObservationList'
import { CornersList, NoCorners } from '../Components/CornersList'
import Data from '../Utils/Data'
import SessionSelection from '../Components/SessionSelection'
import * as ROUTES from '../constants/routes'
import { UserContext } from '../providers/UserProvider'
import tracks from '../constants/tracks.json'

const NoTrack = () => {
  return (
    <div className="wrapper">
      <h1 data-testid="not-found">Can't find that track</h1>
      <p>
        <Link to="/">Try again please</Link>
      </p>
    </div>
  )
}

const data = new Data()

const Track = () => {
  // for the context API
  const user = useContext(UserContext)
  const { trackName } = useParams()
  console.log('track name:', trackName)

  // initialize the state
  const [trackExists, setTrackExists] = useState(false)
  const [authUser, setAuthUser] = useState(null)
  // const [error, setError] = useState(null);
  const [sessions, setSessions] = useState([])
  const [currentSession, setCurrentSession] = useState(null)
  const [corners, setCorners] = useState(null)
  const [observations, setObservations] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const [visibleNotesForm, setVisibleNotesForm] = useState(false)
  const [visibleCornerForm, setVisibleCornerForm] = useState(false)
  const [currentId, setCurrentId] = useState('')
  const [trackID, setTrackID] = useState(trackName)

  const handleAdd = (type) => {
    if (type === 'notes') setVisibleNotesForm(true)
    else if (type === 'corner') setVisibleCornerForm(true)
  }

  const handleCancel = (type) => {
    if (type === 'notes') setVisibleNotesForm(false)
    else if (type === 'corner') setVisibleCornerForm(false)
  }

  const addOrEdit = (obj) => {
    setVisibleNotesForm(false)
    const date = new Date()
    const obs = {
      notes: obj.notes,
      setupName: obj.setupName,
      time: date.getTime(),
    }

    if (currentId === '') {
      data.recordObservation(authUser, trackID, currentSession, obs)
    } else {
      data.editObservation(authUser, trackID, currentSession, currentId, obs)
      setCurrentId('')
    }
  }

  const addOrEditCorner = (corner, notes) => {
    setVisibleCornerForm(false)
    let obs = { notes }
    data.recordCorner(authUser, trackID, currentSession, corner, obs)
    setCurrentId('')
  }

  const renameSession = (value) => {
    data.renameSession(authUser, trackID, currentSession, value)
  }

  const newSession = (value) => {
    data.newSession(authUser, trackID, value)
  }

  const onDelete = (type, id) => {
    if (window.confirm(`Are you sure to delete this entry`)) {
      data.deleteEntry(authUser, trackID, currentSession, type, id)
    }
  }

  const changeSession = (e) => {
    const newSession = e.target.value
    // the new session to load
    let newState = sessions.filter((session) => session.id === newSession)
    let corners = newState
      .map((session) => {
        return session.corners
      })
      .pop()
    let observations = newState
      .map((session) => {
        return session.observations
      })
      .pop()

    // if(!turns) { // in case there's no data in firebase
    //   turns = []
    // }
    // load in state
    setCurrentSession(newSession)
    setCorners(corners)
    setObservations(observations)
    console.log('turns loaded', observations)
  }

  const setTrackCurrentId = (type, id) => {
    setCurrentId(id)
    if (type === 'notes') setVisibleNotesForm(true)
    else if (type === 'corners') setVisibleCornerForm(true)
  }

  // on component mount
  useEffect(() => {
    // does the track exist?
    if (tracks.hasOwnProperty(trackName)) setTrackExists(true)

    // do we have a user?
    let loggedInUser
    user && (loggedInUser = user.user.userID)

    // check if user exists in local storage for browser refresh
    let sessionUser = sessionStorage.getItem('authUser')
    sessionUser && (loggedInUser = sessionUser)

    if (loggedInUser && loggedInUser !== 'guest') {
      // ensure user is stored everywhere
      sessionStorage.setItem('authUser', loggedInUser)
      setAuthUser(loggedInUser)

      console.log('track ID before loading data', trackID)

      data.loadData({
        authUser: loggedInUser,
        trackID: trackID,
        onResult: (values) => {
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
      data.detachListener({ authUser: authUser, trackID: trackID })
    }
  }, [])

  // when something updates
  useEffect(() => {
    let sessionUser = sessionStorage.getItem('authUser')
    // clear the authUser when the user logs out
    if (authUser !== null && user === 'guest' && !sessionUser) {
      console.log('doom and gloom!')
      setAuthUser(null)
      sessionStorage.clear()
    }
  }, [authUser])

  const found = sessions.find((session) => session.id === currentSession)
  let sessionName = ''
  if (typeof found !== 'undefined') {
    sessionName = found.name
  }

  const Guest = () => {
    return (
      <div className="guest">
        <h2>Sign up free</h2>
        <p>
          Start taking notes and improve your driving everytime you get on
          track.{' '}
        </p>
        <p>
          <button>
            <Link to={ROUTES.SIGN_UP}>Sign up</Link>
          </button>
        </p>
        <p>
          Already a user? <Link to="/login">Log in</Link>.
        </p>
      </div>
    )
  }

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
                <h3>Observations</h3>
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
                          onDelete={onDelete}
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
                <h3>Corners</h3>
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
                    Object.entries(corners).map((corner) => {
                      return (
                        <CornersList
                          key={Math.random()}
                          name={corner[0]}
                          notes={corner[1]}
                          onDelete={onDelete}
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

export default Track
