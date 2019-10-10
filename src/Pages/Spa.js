import React, { Component } from 'react';
import * as firebase from 'firebase/app'
import "firebase/database"
import update from 'immutability-helper'
import NotLoggedIn from '../Components/NotLoggedIn'
import ImageMapper from 'react-image-mapper'
import Drawer from '../Components/Drawer'
import Summary from '../Components/Summary'
import renderIf from 'render-if'

let dataIsReady = false;
let trackName= "Spa Francorchamps";
let trackID= "0";
let URL = "/images/Spa-Francorchamps_of_Belgium.svg";
let MAP = {
  name: "my-map",
  areas: [
    { name: "1", shape: "circle", coords: [194,533,24], fillColor: "rgba(0, 0, 0, 0.25)"  },
    { name: "2", shape: "circle", coords: [43,379,27], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "3", shape: "circle", coords: [120,243,21], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "4", shape: "circle", coords: [145,197,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "5", shape: "circle", coords: [208,175,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "6", shape: "circle", coords: [362,115,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "7", shape: "circle", coords: [714,45,22], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "8", shape: "circle", coords: [757,67,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "9", shape: "circle", coords: [813,50,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "10", shape: "circle", coords: [922,77,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "11", shape: "circle", coords: [828,133,26], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "12", shape: "circle", coords: [566,231,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "13", shape: "circle", coords: [826,342,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "14", shape: "circle", coords: [771,415,26], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "15", shape: "circle", coords: [898,449,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "16", shape: "circle", coords: [834,544,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "17", shape: "circle", coords: [635,372,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "18", shape: "circle", coords: [471,314,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "19", shape: "circle", coords: [230,450,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "20", shape: "circle", coords: [256,357,27], fillColor: "rgba(0, 0, 0, 0.25)" },
  ]
}

class Spa extends Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
      // trackName: "Spa Francorchamps",
      authUser: null,
      userEmail: null,
      error: null,
      isOpen: false,
      turn: null,
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
    this.clicked = this.clicked.bind(this);
    // this.updateTurn = this.updateTurn.bind(this);
    // this.registerNotes = this.registerNotes.bind(this);
  }

  loadData = () => {
    let that = this; //🤯
    firebase.database().ref('/users/' + that.state.authUser + '/tracks/'+ trackID +'/turn').on('value', function(snapshot) {
      // if no data exists have an empty object, rather than null
      let turns;
      !snapshot.val() ? turns = {} : turns = snapshot.val();

      that.setState({
        turns: update(that.state.turns, {$merge: turns})
      },() => {
        dataIsReady = true;
        console.log("data loaded");
        console.log(that.state.turns);
      })
    });
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
          updates['/users/'+ this.state.authUser +'/tracks/'+ trackID +'/name'] = trackName;
          firebase.database().ref().update(updates);
          this.loadData();
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

  clicked(area) {
		console.log('You\'ve clicked turn '+area.name);
    this.setState({
      isOpen: !this.state.isOpen,
      turn: area.name,
    });
	}

  render() {

    let canvasWidth = window.innerWidth;

    // const trackTurns = ["La Source", "", "", "", "Raidillon", "Eau Rouge", "", "Les Combes" ];

    return (
      <div className="wrapper">
      {!this.state.authUser ? <NotLoggedIn/> :
        <div className="track-wrapper">
        <div className="track">
          <ImageMapper
            src={URL}
            map={MAP}
            width={canvasWidth-500}
            imgWidth={940}
            onClick={area => this.clicked(area)}
          />
        </div>
        <Summary notes={this.state.turns} />
        {renderIf(dataIsReady)(
          <Drawer
            isOpen={this.state.isOpen}
            onClick={area => this.clicked(this.state.turn)}
            turnsData={this.state.turns}
            turn={this.state.turn}
            trackName={trackName}
            trackID={trackID}
            authUser={this.state.authUser}
          />
        )}
      </div>

      }
      </div>
    );
  }
}

export default Spa;
