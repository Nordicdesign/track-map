import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

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
  firebase.initializeApp(firebaseConfig);

class Fb extends Component {

  constructor(props,context) {
    super(props,context);

    this.state = {
      // turn: {
      //   entry: "neutral",
      //   mid: "neutral",
      //   exit: "neutral",
      // },
      // turn: {},
      // turn2: null,
    };

    this.updateTurn = this.updateTurn.bind(this);
  }

  loadData() {
    let that = this; //🤯
    firebase.database().ref('/users/0/tracks/0/turn/1').on('value', function(snapshot) {
      let turn = snapshot.val()
      console.log(turn);

      that.setState({
        turn: turn
      })
    });
  }

  updateTurn(turnID, section, behaviour) {

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/0/tracks/0/turn/' + turnID + '/' + section] = behaviour;

    return firebase.database().ref().update(updates);
  }

  componentDidMount() {
    this.loadData();
  }

  render() {

    return (
      <div>
        <div className="wrapper">
          <h1>TrackMap</h1>
          <h2>Track name</h2>
          <p>Turn 1</p>
          <ul>
            <li>
              Entry: {this.state.turn && this.state.turn["entry"] ? this.state.turn["entry"] : 'neutral'}
              <button
                onClick={() => this.updateTurn("1","entry","understeer")}
                >
                Understeer
              </button>
              <button
                onClick={() => this.updateTurn("1","entry","neutral")}
                >
                Neutral
              </button>
              <button
                onClick={() => this.updateTurn("1","entry","oversteer")}
                >
                Oversteer
              </button>
            </li>
            <li>
              Mid: {this.state.turn && this.state.turn["mid"] ? this.state.turn["mid"] : 'neutral'}
              <button
                onClick={() => this.updateTurn("1","mid","understeer")}
                >
                Understeer
              </button>
              <button
                onClick={() => this.updateTurn("1","mid","neutral")}
                >
                Neutral
              </button>
              <button
                onClick={() => this.updateTurn("1","mid","oversteer")}
                >
                Oversteer
              </button>
            </li>
            <li>
              Exit: {this.state.turn && this.state.turn["exit"] ? this.state.turn["exit"] : 'neutral'}
              <button
                onClick={() => this.updateTurn("1","exit","understeer")}
                >
                Understeer
              </button>
              <button
                onClick={() => this.updateTurn("1","exit","neutral")}
                >
                Neutral
              </button>
              <button
                onClick={() => this.updateTurn("1","exit","oversteer")}
                >
                Oversteer
              </button>
            </li>
          </ul>

        </div>
      </div>
    );
  }
}

export default Fb;
