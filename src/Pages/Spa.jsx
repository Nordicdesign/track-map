import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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

class Spa extends Component {

  constructor(props,context) {
    super(props,context);

    this.state = {
      trackName: "Spa Francorchamps",
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
    var updates = {};
    updates['/users/0/tracks/0/name'] = "Spa Francorchamps";

    firebase.database().ref().update(updates);
    this.loadData();
  }

  render() {
    console.log(this.state.turns);

    return (
        <div className="wrapper">
          <div className="track">
            <div className="track-logs">
              <h1>{this.state.trackName}</h1>

              <ul className="corner-areas">
                <li>Entry</li>
                <li>Mid</li>
                <li>Exit</li>
              </ul>

              {this.state.turns.map((turn,i) =>
                  <ul className="track-turn">
                    <li className="track-turn-individual">
                      <div>
                        <p>{i}</p>

                        <ul>
                          <li key={'entry' + i}>
                            <button
                              onClick={() => this.updateTurn(i,"entry","understeer")}
                              className={turn.entry === "understeer" ? "selected" : ""}
                              >
                              U
                            </button>
                            <button
                              onClick={() => this.updateTurn(i,"entry","neutral")}
                              className={turn.entry === "neutral" ? "selected" : ""}
                              >
                              N
                            </button>
                            <button
                              onClick={() => this.updateTurn(i,"entry","oversteer")}
                              className={turn.entry === "oversteer" ? "selected" : ""}
                              >
                              O
                            </button>
                          </li>
                          <li key={'mid' + i}>
                            <button
                              onClick={() => this.updateTurn(i,"mid","understeer")}
                              className={turn.mid === "understeer" ? "selected" : ""}
                              >
                              U
                            </button>
                            <button
                              onClick={() => this.updateTurn(i,"mid","neutral")}
                              className={turn.mid === "neutral" ? "selected" : ""}
                              >
                              N
                            </button>
                            <button
                              onClick={() => this.updateTurn(i,"mid","oversteer")}
                              className={turn.mid === "oversteer" ? "selected" : ""}
                              >
                              O
                            </button>
                          </li>
                          <li key={'exit' + i}>
                            <button
                              onClick={() => this.updateTurn(i,"exit","understeer")}
                              className={turn.exit === "understeer" ? "selected" : ""}
                              >
                              U
                            </button>
                            <button
                              onClick={() => this.updateTurn(i,"exit","neutral")}
                              className={turn.exit === "neutral" ? "selected" : ""}
                              >
                              N
                            </button>
                            <button
                              onClick={() => this.updateTurn(i,"exit","oversteer")}
                              className={turn.exit === "oversteer" ? "selected" : ""}
                              >
                              O
                            </button>
                          </li>

                        </ul>
                      </div>

                      <p className="track-turn-notes">
                        <label>
                          Notes
                          <textarea
                            name=""
                            id=""
                            value={turn.notes ? turn.notes : ""}
                            onChange={(e) => this.registerNotes(e, i)}
                           />
                        </label>
                      </p>
                    </li>
                </ul>
              )};
          </div>

          <div className="track-map">
            <img src="/images/Spa-Francorchamps_of_Belgium.svg" alt="Map of Spa Francorchamps circuit"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Spa;
