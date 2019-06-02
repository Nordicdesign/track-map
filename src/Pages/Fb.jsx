import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyD2-YAZ1Spbo1dltQItBTcUqcq_ues930k",
    authDomain: "trackmap-f1119.firebaseapp.com",
    databaseURL: "https://trackmap-f1119.firebaseio.com",
    projectId: "trackmap-f1119",
    storageBucket: "",
    messagingSenderId: "488157650119",
    appId: "1:488157650119:web:c4d401fdd7dcdc87"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

class Fb extends Component {

  constructor(props,context) {
    super(props,context);

    this.state = {
      turn: null,
    };

    this.handleUndersteer = this.handleUndersteer.bind(this);
    this.handleOversteer = this.handleOversteer.bind(this);
  }

  loadData() {
    let that = this; //🤯
    firebase.database().ref('/users/0/tracks/0/turn/1').on('value', function(snapshot) {
      let turn = (snapshot.val() ) || 'Neutral';
      that.setState({
        turn: turn
      })
    });
  }

  updateTurn(turn) {

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/0/tracks/0/turn/1'] = turn;

    return firebase.database().ref().update(updates);
  }

handleUndersteer() {
  // console.log('hola' + e);
  // console.log("hola!");
  this.updateTurn('understeer')
  // this.loadData();
}

handleOversteer() {
  // console.log('hola' + e);
  // console.log("hola!");
  this.updateTurn('oversteer')
  // this.loadData();
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
          <ul>
            <li>
              Turn 1: {this.state.turn}
              <button
                onClick={this.handleUndersteer}
                >
                Understeer
              </button>
              <button
                onClick={this.handleOversteer}
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
