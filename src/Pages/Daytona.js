import React, { Component } from 'react'
import { AddNewObservation, AddNewCorner } from '../Components/AddNew'
import { ObservationList, NoObservations } from '../Components/ObservationList'
import { CornersList, NoCorners } from '../Components/CornersList'
// import TrackNotes from '../Components/TrackNotes'
// import TrackMeta from '../Components/TrackMeta'
import Data from '../Utils/Data'
import * as firebase from 'firebase/app'
import "firebase/database"
// import update from 'immutability-helper'
import SessionSelection from '../Components/SessionSelection'

const data = new Data();

// const numberTurns = 10 + 1; // Add the number of actual turns, but we need an extra one for the zero
const trackName = "Daytona";
const trackID= "daytona";
const URL = "/images/Daytona_International_Speedway_-_Road_Course.svg__81933_original.webp";


class Daytona extends Component {
  constructor(props,context) {
    super(props,context);
    this.handleAddObservation = this.handleAddObservation.bind(this);
    this.handleCancelObservation = this.handleCancelObservation.bind(this);
    this.handleAddCorner = this.handleAddCorner.bind(this);
    this.handleCancelCorner = this.handleCancelCorner.bind(this);
    // this.handleCreateCorner = this.handleCreateCorner.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleCancelEditCorner = this.handleCancelEditCorner.bind(this);
    // this.handleEditCorner = this.handleEditCorner.bind(this);
    // this.handleStartEditCorner = this.handleStartEditCorner.bind(this);

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
      // newObservation: null,
      // newObservationNotes: "",
      // newObservationSetupName: "",
      visibleCornerForm: false,
      // newCornerNumber: "",
      // newCornerNotes: "",
      // editCorner: false,
      // editCornerNotes: "",
      // editCornerNumber: "",
      currentId: ""
    };
  }

  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //
  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleAddObservation() {
    this.setState({visibleNotesForm: true});
  }

  handleCancelObservation() {
    this.setState({visibleNotesForm: false});
  }

  handleAddCorner() {
    this.setState({visibleCornerForm: true});
  }

  handleCancelCorner() {
    this.setState({visibleCornerForm: false});
  }

  addOrEdit = (obj) => {
    if (this.state.currentId === "") {
      this.setState({visibleNotesForm: false});
      const date = new Date();
      const obs = {
        notes: obj.notes,
        setupName: obj.setupName,
        time: date.getTime(),
      }
      data.recordObservation(this.state.authUser, trackID, this.state.currentSession, obs)
    }
    else {
      console.log("we're editing");
    }
  }

  onDelete = (type, id) => {
    if (window.confirm(`Are you sure to delete this entry`)) {
        data.deleteEntry(this.state.authUser, trackID, this.state.currentSession, type, id)
    }
  }

  handleCreateCorner(e) {
    e.preventDefault();
    this.setState({addNewCorner: false});
    let { authUser, currentSession, newCornerNumber, newCornerNotes } = this.state
    const obs = {
      notes: newCornerNotes,
    }
    data.recordCorner(authUser, trackID, currentSession, newCornerNumber, obs, function(obs) {
      console.log("the function return",obs);
    })
  }

  componentDidMount() {
    let that = this;
    // const {trackID,trackName} = this.props;

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

          data.loadData(uid, trackID, function(values) {
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

            // console.log(observationsValues);

            that.setState({
              sessions: values.sessions,
              currentSession: values.currentSession[0].id,
              // corners: update(corners, {$merge: cornerValues}),
              // observations: update(that.state.observations, {$merge: observationsValues}),
              // observations: observationsValues,
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
    // console.log(sessions);
    const found = sessions.find(session => session.id === currentSession);
    let sessionName = ""
    if (typeof found !== "undefined") {
      // console.log(found.name);
      sessionName = found.name
      // date = timestamp.toLocaleString()
    }

    let newOvervationEntry;
    if (visibleNotesForm) {
      newOvervationEntry = (
        <AddNewObservation
          currentId={currentId}
          addOrEdit={this.addOrEdit}
          handleCancelObservation={this.handleCancelObservation}
        />
      )
    }
    let newCornerEntry;
    if (visibleCornerForm) {
      newCornerEntry = (
        <AddNewCorner
          handleCancelCorner={this.handleCancelCorner}
          handleCreateCorner={this.handleCreateCorner}
          newCornerNotes={this.newCornerNotes}
          newCornerNumber={this.newCornerNumber}
          handleInputChange={this.handleInputChange}
        />
      )
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
              <button onClick={this.handleAddObservation}>Add new</button>
            </div>

            {newOvervationEntry}
            {console.log(observations)}
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
                  />
              )) : <NoObservations/>
              }
            </div>

          </div>

          <div className="track-corners">
            <div className="track-corners-header">
              <h3>Corners</h3>
              <button onClick={this.handleAddCorner}>Add new</button>
            </div>

            {newCornerEntry}

            <div>
              { corners ? ( Object.entries(corners).map(corner => {
                return (
                  <CornersList
                    key={Math.random()}
                    name={corner[0]}
                    notes={corner[1]}
                  />
              )})) : <NoCorners/>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Daytona
