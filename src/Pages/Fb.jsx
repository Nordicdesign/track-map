import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import update from 'immutability-helper';

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
      turns: [
        ,
        {},
        {},
        {},
        {}
      ]
    };

    this.updateTurn = this.updateTurn.bind(this);
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

  updateTurn(turnID, section, behaviour) {

    console.log(turnID);

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/0/tracks/0/turn/' + turnID + '/' + section] = behaviour;

    return firebase.database().ref().update(updates);
  }

  componentDidMount() {
    this.loadData();
  }

  render() {

    // let list = ["1", "2", "3"] ;
    // let section;
    // let that = this;
    console.log(this.state.turns);

    return (
      <div>
        <div className="wrapper">
          <h1>TrackMap</h1>
          <h2>Track name</h2>

            {this.state.turns.map((turn,i) =>

              <ul key={i}>
                {console.log(turn)}

                <li>Turn {i}</li>
              {/*
                <li id={'entry' + i}>
                  Entry: {this.state.turns[i].entry ? this.state.turns[i].entry : 'neutral'}
                  <button
                    onClick={() => this.updateTurn(i,"entry","understeer")}
                    >
                    Understeer
                  </button>
                  <button
                    onClick={() => this.updateTurn(i,"entry","neutral")}
                    >
                    Neutral
                  </button>
                  <button
                    onClick={() => this.updateTurn(i,"entry","oversteer")}
                    >
                    Oversteer
                  </button>
                </li>
                  */}
              </ul>
            )};


        </div>
      </div>
    );
  }
}

export default Fb;
