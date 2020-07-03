import React, { Component } from 'react'
import { AddNewObservation, AddNewCorner } from './AddNew'
import { ObservationList, NoObservations } from './ObservationList'
import { CornersList, NoCorners } from './CornersList'
import Data from '../Utils/Data'
import * as firebase from 'firebase/app'
import "firebase/database"
import SessionSelection from './SessionSelection'

const data = new Data();

class Track extends Component {
  constructor(props,context) {
    super(props,context);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    //
    // const { trackID } = props
    // console.log(trackID);
    this.state = {
      authUser: null,
      userEmail: null,
      error: null,
      sessions: [],
      currentSession: null,
      observations: null,
      corners: null,
      dataIsReady: false,
      visibleNotesForm: false,
      visibleCornerForm: false,
      currentId: "",
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

  onDelete = (type, id) => {
    if (window.confirm(`Are you sure to delete this entry`)) {
        data.deleteEntry(this.state.authUser, this.state.trackID, this.state.currentSession, type, id)
    }
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
    let that = this;
    // first time only, when the user loads the page and they are logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        let userEmail = user.email;
        let uid = user.uid;
        that.setState({
          authUser: uid,
          userEmail: userEmail
        }, function() {

          // let { corners, observations } = that.state
          data.loadData(uid, that.state.trackID, function(values) {
            // console.log("values from load data",values);
            // console.log("obs", values.newState[0].observations);
            // let observationsValues = []
            // let cornerValues = []
            // if (typeof values.newState[0].corners !== "undefined") {
            //   cornerValues = values.newState[0].corners
            // }
            // if (typeof values.newState[0].observations !== "undefined") {
            //   observationsValues.push(values.newState[0].observations)
            // }
            that.setState({
              sessions: values.sessions,
              currentSession: values.currentSession[0].id,
              observations: values.observations,
              corners: values.corners
            },() => {
              that.setState({dataIsReady: true})
            })
          })
        })
      } else {
        that.setState({
          authUser: null,
          userEmail: null,
          error: null
        })
      }
    });
  }

  render() {

    let { sessions, currentSession, visibleNotesForm, visibleCornerForm, observations, corners, currentId } = this.state
    const { trackName, URL } = this.props

    const found = sessions.find(session => session.id === currentSession);
    let sessionName = ""
    if (typeof found !== "undefined") {
      // console.log(found.name);
      sessionName = found.name
      // date = timestamp.toLocaleString()
    }

    return (
      <div className="track-wrapper">
        <div className="track-meta">
          <h1>{trackName}</h1>
          <SessionSelection
            sessions={sessions}
            currentSession={currentSession}
            changeSession={this.changeSession}
          />
        </div>

        <div className="track-map">
          <img src={URL} alt={trackName} />
        </div>

        <div className="track-session">
          <h2>Session</h2>
          <p>{sessionName}</p>
        </div>

        <div className="track-notes">
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
        </div>
      </div>
    )
  }
};

export default Track
