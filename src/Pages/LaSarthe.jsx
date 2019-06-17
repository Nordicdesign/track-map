import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import update from 'immutability-helper';
import TrackLogs from '../Components/TrackLogs'

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: "https://trackmap-f1119.firebaseio.com",
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }


class LaSarthe extends Component {

  constructor(props,context) {
    super(props,context);

    this.state = {
      trackName: "Circuit de La Sarthe",
      turns: [
        ,
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

    console.log(turnID);

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/0/tracks/1/turn/' + turnID + '/' + section] = behaviour;

    return firebase.database().ref().update(updates);
  }

  componentDidMount() {
    var updates = {};
    updates['/users/0/tracks/1/name'] = "Circuit de La Sarthe";

    firebase.database().ref().update(updates);
    this.loadData();
  }

  render() {
    console.log(this.state.turns);

    return (
      <div className="wrapper">
        <div className="track">
          <TrackLogs
            turns={this.state.turns}
            trackNam={this.state.trackName}
            updateTurn={this.updateTurn}
            registerNotes={this.registerNotes}
          />

          <div className="track-map">
            <img src="/images/LeMans24BlankMapSmall.jpg" alt="Map of La Sarthe circuit"/>
          </div>
        </div>
      </div>
    );
  }
}

export default LaSarthe;
