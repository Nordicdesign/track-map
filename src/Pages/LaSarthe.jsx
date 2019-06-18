import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/database";
import Firebase from "../Components/Firebase"
import update from 'immutability-helper';
import TrackLogs from '../Components/TrackLogs'
import {NotLoggedIn} from '../Components/NotLoggedIn'

class LaSarthe extends Component {

  constructor(props,context) {
    super(props,context);
    this.state = {
      trackName: "Circuit de La Sarthe",
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
    firebase.database().ref('/users/0/tracks/1/turn').on('value', function(snapshot) {
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
    updates['/users/0/tracks/1/turn/' + turnID + '/notes'] = event.target.value;
    return firebase.database().ref().update(updates);
  }

  updateTurn(turnID, section, behaviour) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/0/tracks/1/turn/' + turnID + '/' + section] = behaviour;
    return firebase.database().ref().update(updates);
  }

  componentDidMount() {
    // check the user
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
    // do something about the track
    var updates = {};
    updates['/users/0/tracks/1/name'] = "Circuit de la Sarthe";
    firebase.database().ref().update(updates);
    this.loadData();
  }

  render() {
    const trackTurns = [
      "",
      "Dunlop curve",
      "Dunlop chicane 1",
      "Dunlop chicane 2",
      "Esses",
      "",
      "",
      "",
      "Tertre Rougue",
      "1st chicane",
      "",
      "",
      "2nd chicane",
      "",
      "",
      "",
      "Mulsanne",
      "",
      "Indianapolis",
      "Arnage",
      "Porsche curve 1",
      "Porsche curve 2",
      "Porsche curve 2",
      "Esses du Karting",
      "Corvette curve",
      "Ford curves"
    ]

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
              <img src="/images/la-sarthe.png" alt="Map of la Sarthe circuit"/>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default LaSarthe;
