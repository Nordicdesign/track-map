import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AddNewObservation, AddNewCorner } from './AddNew'
import { ObservationList, NoObservations } from './ObservationList'
import { CornersList, NoCorners } from './CornersList'
import Data from '../Utils/Data'
import "firebase/database"
import SessionSelection from './SessionSelection'
import * as ROUTES from '../constants/routes'
import { UserContext } from "../providers/UserProvider";

const data = new Data();

const initial_load = {
  authUser: null,
  error: null,
  sessions: [],
  currentSession: null,
  observations: null,
  dataIsReady: false,
  visibleNotesForm: false,
  visibleCornerForm: false,
  currentId: "",
}

class Track extends Component {
  // for the context API
  static contextType = UserContext;

  constructor(props,context) {
    super(props,context);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      ...initial_load,
      trackID: props.trackID
    };
  }


  handleAdd(type) {
    if (type === "notes")
      this.setState({visibleNotesForm: true});
    else if (type === 'corner')
      this.setState({visibleCornerForm: true});
  }

  handleCancel(type) {
    if (type === "notes")
      this.setState({visibleNotesForm: false});
    else if (type === 'corner')
      this.setState({visibleCornerForm: false});
  }

  addOrEdit = (obj) => {
    this.setState({visibleNotesForm: false});
    const date = new Date();
    const obs = {
      notes: obj.notes,
      setupName: obj.setupName,
      time: date.getTime(),
    }

    if (this.state.currentId === "") {
      data.recordObservation(this.state.authUser, this.state.trackID, this.state.currentSession, obs)
    }
    else {
      data.editObservation(this.state.authUser, this.state.trackID, this.state.currentSession, this.state.currentId, obs)
      this.setState({currentId: ""})
    }
  }

  addOrEditCorner = (corner, notes) => {
    let { authUser, currentSession } = this.state
    this.setState({visibleCornerForm: false});
    let obs = { notes }
    data.recordCorner(authUser, this.state.trackID, currentSession, corner, obs)
    this.setState({currentId: ""})
  }

  renameSession = (value) => {
    let { authUser, currentSession, trackID } = this.state
    data.renameSession(authUser, trackID, currentSession, value)
  }

  newSession = (value) => {
    let { authUser, trackID } = this.state
    data.newSession(authUser, trackID, value)
  }

  onDelete = (type, id) => {
    if (window.confirm(`Are you sure to delete this entry`)) {
        data.deleteEntry(this.state.authUser, this.state.trackID, this.state.currentSession, type, id)
    }
  }

  changeSession = (e) => {
    const newSession = e.target.value;
    // the new session to load
    let newState = this.state.sessions.filter(session => session.id === newSession);
    let corners = newState.map((session) => {
      return session.corners
    }).pop();
    let observations = newState.map((session) => {
      return session.observations
    }).pop();

    // if(!turns) { // in case there's no data in firebase
    //   turns = []
    // }
    // load in state
      this.setState({
        // save the new one
        currentSession: newSession,
        corners,
        observations
    },() => {
      // dataIsReady = true;
      console.log("turns loaded",this.state.observations);
    })
  }

  setCurrentId = (type, id) => {
    this.setState({
      currentId: id
    }, () => {
      if (type === 'notes')
        this.setState({visibleNotesForm: true})
      else if (type === 'corners')
        this.setState({visibleCornerForm: true})
    })
  }

  componentDidMount() {
    let user = this.context
    let that = this
    // get user from context on normal navigation
    if (user && user !== 'guest') {
      console.log("normal load");
      sessionStorage.setItem("authUser", user.userID)
      this.setState({
        authUser: user.userID
      }, () => {
        data.loadData(user.userID, this.state.trackID, function(values) {
          that.setState({
            sessions: values.sessions,
            currentSession: values.currentSession[0].id,
            observations: values.observations,
            // corners: values.corners
          },() => {
            that.setState({dataIsReady: true})
          })
        })
      })
    }
    // ensure user is there if page get hard refreshed
    let sessionUser = sessionStorage.getItem("authUser")
    if (this.state.authUser === null && sessionUser !== null) {
      console.log("additional load for refresh");
      this.setState({
        authUser: sessionUser
      }, () => {
        data.loadData(sessionUser, this.state.trackID, function(values) {
          that.setState({
            sessions: values.sessions,
            currentSession: values.currentSession[0].id,
            observations: values.observations,
            // corners: values.corners
          },() => {
            that.setState({dataIsReady: true})
          })
        })
      })
    }
  }

  componentDidUpdate() {
    let user = this.context
    let sessionUser = sessionStorage.getItem("authUser")
    // clear the authUser when the user logs out
    if (this.state.authUser !== null && user === 'guest' && !sessionUser) {
      console.log("doom and gloom!");
      this.setState({authUser: null})
      sessionStorage.clear()
    }
  }

  componentDidUnmount() {
    this.setState({...initial_load})
  }

  render() {
    let { authUser, sessions, currentSession, visibleNotesForm, visibleCornerForm, observations, corners, currentId } = this.state
    const { trackName, URL } = this.props

    const found = sessions.find(session => session.id === currentSession);
    let sessionName = ""
    if (typeof found !== "undefined") {
      sessionName = found.name
    }

    const Guest = () => {
      return (
        <div className="guest">
          <h2>Sign up free</h2>
          <p>Start taking notes and improve your driving everytime you get on track. </p>
          <p><button><Link to={ROUTES.SIGN_UP}>Sign up</Link></button></p>
          <p>Already a user? <Link to="/login">Log in</Link>.</p>
        </div>
      )
    }

    return (
      <div className="track-wrapper">
        <div className="track-meta">
          <h1>{trackName}</h1>

          { authUser ? (
            <SessionSelection
              sessions={sessions}
              currentSession={currentSession}
              changeSession={this.changeSession}
              renameSession={this.renameSession}
              newSession={this.newSession}
            />
        ) : ( null ) }

        </div>

        <div className="track-map">
          <img src={URL} alt={trackName} />
        </div>
        { authUser ? (
          <div className="track-session">
            <h2>Session</h2>
            <p>{sessionName}</p>
          </div>
        ) : ( null ) }


        <div className="track-notes">
          { authUser ? (
            <>
            <div className="track-observations">
              <div className="track-observations-header">
                <h3>Observations</h3>
                <button onClick={() => this.handleAdd('notes')}>Add new</button>
              </div>

              {visibleNotesForm ? (
                <AddNewObservation
                  currentId={currentId}
                  addOrEdit={this.addOrEdit}
                  observations={observations}
                  handleCancel={this.handleCancel}
                />
              ) : (
                <div>
                  { (observations) ?
                    Object.keys(observations).reverse().map((key) => (
                       <ObservationList
                        key={key}
                        id={key}
                        name={observations[key].time}
                        notes={observations[key].notes}
                        setupName={observations[key].setupName}
                        onDelete={this.onDelete}
                        setCurrentId={this.setCurrentId}
                      />
                  )) : <NoObservations/>
                  }
                </div>
              )}


            </div>

            <div className="track-corners">
              <div className="track-corners-header">
                <h3>Corners</h3>
                <button onClick={() => this.handleAdd('corner')}>Add new</button>
              </div>

              {visibleCornerForm ? (
                <AddNewCorner
                  currentId={currentId}
                  addOrEditCorner={this.addOrEditCorner}
                  corners={corners}
                  handleCancel={this.handleCancel}
                />
              ) : (
                <div>
                  { corners ? ( Object.entries(corners).map(corner => {
                    return (
                      <CornersList
                        key={Math.random()}
                        name={corner[0]}
                        notes={corner[1]}
                        onDelete={this.onDelete}
                        setCurrentId={this.setCurrentId}
                      />
                  )})) : <NoCorners/>
                  }
                </div>
              )}
            </div>
            </>
          ) : ( <Guest /> ) }
        </div>
      </div>
    )
  }
};

export default Track
