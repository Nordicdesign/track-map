import React, { Component } from 'react'
import AddNewObservation from '../Components/AddNewObservation'
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
    this.handleCreateObservation = this.handleCreateObservation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      authUser: null,
      userEmail: null,
      error: null,
      sessions: [],
      currentSession: null,
      observations: [],
      corners: [],
      dataIsReady: false,
      addNewObservation: false,
      newObservation: null,
      newObservationNotes: "",
      newObservationSetupName: ""
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleAddObservation() {
    this.setState({addNewObservation: true});
  }

  handleCancelObservation() {
    this.setState({addNewObservation: false});
  }

  handleCreateObservation(e) {
    e.preventDefault();
    const date = new Date();
    const obs = {
      time: date.getTime(),
      notes: this.state.newObservationNotes,
      setup: this.state.newObservationSetupName
    }
    console.log("please send this to firebase",obs);
    // let that = this
    data.recordObservation(this.state.authUser, trackID, this.state.currentSession, obs, function(obs) {
      // this.setState({
      //   observations: update(this.state.observations, {$merge: obs})
      // })
      console.log("the function return",obs);
    })

  }

  // registerNotes(e, turnID) {
  //   const {trackID} = this.props
  //   const {authUser, currentSession} = this.state
  //   var updates = {};
  //   updates['/users/'+ authUser +'/tracks/'+ trackID + '/sessions/' + currentSession + '/turn/' + turnID + '/notes'] = e.target.value;
  //   return firebase.database().ref().update(updates);
  // }

  // componentDidMount(props) {
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
            console.log("values from load data",values);
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
              // console.log("Corners loaded",corners);
              // console.log("Observations loaded",observations);
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

    let { sessions, currentSession, addNewObservation, newObservationNotes, newObservationSetupName, observations, corners } = this.state
    // console.log(sessions);
    const found = sessions.find(session => session.id === currentSession);
    let sessionName = ""
    if (typeof found !== "undefined") {
      // console.log(found.name);
      sessionName = found.name
      // date = timestamp.toLocaleString()
    }

    console.log(corners.length);

    let newOvervationEntry;
    if (addNewObservation) {
      newOvervationEntry = (
        <AddNewObservation
          handleCancelObservation={this.handleCancelObservation}
          handleCreateObservation={this.handleCreateObservation}
          newObservationNotes={newObservationNotes}
          newObservationSetupName={newObservationSetupName}
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
            <div>
              { observations.length > 0 ? (observations.map(function(obs) {
                return (
                  <ObservationList
                    name={obs.time}
                    notes={obs.notes}
                    setup={obs.setup}
                  />
                )
              })) : <NoObservations/>
              }
            </div>

          </div>

          <div className="track-corners">
            <div className="track-corners-header">
              <h3>Corners</h3>
              <button onClick={this.handleAddObservation}>Add new</button>
            </div>

            <div>
              { corners.length > 0 ? (corners.map(function(obs) {
                return (
                  <CornersList
                    name={obs.time}
                    notes={obs.notes}
                    setup={obs.setup}
                  />
                )
              })) : <NoCorners/>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Daytona
