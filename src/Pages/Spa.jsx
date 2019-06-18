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

  loadData() {
    let that = this; //🤯
    firebase.database().ref('/users/0/tracks/0/turn').on('value', function(snapshot) {
      let turns = snapshot.val()
      console.log(turns);
      that.setState({
        turns: update(that.state.turns, {$merge: turns})
      })
    });
  }

  registerNotes(event, turnID) {
    console.log(event.target.value);
    var updates = {};
    updates['/users/0/tracks/0/turn/' + turnID + '/notes'] = event.target.value;
    return firebase.database().ref().update(updates);
  }

  updateTurn(turnID, section, behaviour) {
    console.log(turnID);
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/0/tracks/0/turn/' + turnID + '/' + section] = behaviour;
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
        })
      } else {
        that.setState({
          authUser: null,
          userEmail: null,
          error: null
        })
      }
    });
    var updates = {};
    updates['/users/0/tracks/0/name'] = "Spa Francorchamps";
    firebase.database().ref().update(updates);
    this.loadData();
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
            updateTurn={this.state.updateTurn}
            registerNotes={this.state.registerNotes}
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
