import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Firebase from "../Components/Firebase"
import * as firebase from 'firebase/app'
import "firebase/database"
import update from 'immutability-helper'
import TrackLogs from '../Components/TrackLogs'
import {NotLoggedIn} from '../Components/NotLoggedIn'

class Spa extends Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
      trackName: "Spa Francorchamps",
      authUser: null,
      userEmail: null,
      error: null,
      turns: [
        ,
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    };
    this.updateTurn = this.updateTurn.bind(this);
    this.registerNotes = this.registerNotes.bind(this);
  }

  loadData(uid) {
    console.log(uid);
    let that = this; //🤯
    firebase.database().ref('/users/' + uid + '/tracks/0/turn').on('value', function(snapshot) {

      // if no data exists have an empty object, rather than null
      let turns;
      !snapshot.val() ? turns = {} : turns = snapshot.val();

      that.setState({
        turns: update(that.state.turns, {$merge: turns})
      })
    });
  }

  registerNotes(event, turnID) {
    console.log(event.target.value);
    var updates = {};
    updates['/users/'+ this.state.authUser +'/tracks/0/turn/' + turnID + '/notes'] = event.target.value;
    return firebase.database().ref().update(updates);
  }

  updateTurn(turnID, section, behaviour) {
    // console.log(this.state.authUser);
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/' + this.state.authUser + '/tracks/0/turn/' + turnID + '/' + section] = behaviour;
    return firebase.database().ref().update(updates);
  }

  componentDidMount() {
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var userEmail = user.email;
        var uid = user.uid;
        that.setState({
          authUser: uid,
          userEmail: userEmail
        }, function() {
          console.log("waiting for the state to finish");
          // get the data
          var updates = {};
          updates['/users/'+ this.state.authUser +'/tracks/0/name'] = "Spa Francorchamps";
          firebase.database().ref().update(updates);
          this.loadData(this.state.authUser);
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
    const trackTurns = ["La Source", "", "", "", "Raidillon", "Eau Rouge", "", "Les Combes" ];
    return (
      <div className="wrapper">
      {!this.state.authUser ? <NotLoggedIn/> :

        <div className="track">
          <TrackLogs
            turns={this.state.turns}
            trackName={this.state.trackName}
            updateTurn={this.updateTurn}
            registerNotes={this.registerNotes}
            turnNames={trackTurns}
          />

          <div className="track-map">
            <img src="/images/Spa-Francorchamps_of_Belgium.svg" alt="Map of Spa Francorchamps circuit"/>
          </div>
        </div>

      }
      </div>
    );
  }
}

export default Spa;
