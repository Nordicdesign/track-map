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
let trackName= "Circuit de La Sarthe";
let trackID= "1";
let URL = "/images/la-sarthe-horizontal.svg";
let MAP = {
  name: "my-map",
  areas: [
    { name: "1", shape: "circle", coords: [142,450,20], fillColor: "rgba(0, 0, 0, 0.25)"  },
    { name: "2", shape: "circle", coords: [150,348,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "3", shape: "circle", coords: [92,372,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "4", shape: "circle", coords: [56,286,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "5", shape: "circle", coords: [208,175,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "6", shape: "circle", coords: [109,209,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "7", shape: "circle", coords: [34,214,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "8", shape: "circle", coords: [20,93,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "9", shape: "circle", coords: [591,28,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "10", shape: "circle", coords: [608,99,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "11", shape: "circle", coords: [650,25,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "12", shape: "circle", coords: [1105,87,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "13", shape: "circle", coords: [1125,20,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "14", shape: "circle", coords: [1159,89,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "15", shape: "circle", coords: [1508,112,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "16", shape: "circle", coords: [1563,155,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "17", shape: "circle", coords: [1207,540,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "18", shape: "circle", coords: [1117,498,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "19", shape: "circle", coords: [1158,622,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "20", shape: "circle", coords: [777,646,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "21", shape: "circle", coords: [759,551,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "22", shape: "circle", coords: [688,528,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "23", shape: "circle", coords: [628,596,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "24", shape: "circle", coords: [611,500,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "25", shape: "circle", coords: [384,471,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "26", shape: "circle", coords: [344,533,20], fillColor: "rgba(0, 0, 0, 0.25)" },
  ]
}

class LaSarthe extends Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
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

    // const trackTurns = [
    //   "",
    //   "Dunlop curve",
    //   "Dunlop chicane 1",
    //   "Dunlop chicane 2",
    //   "Esses",
    //   "",
    //   "",
    //   "",
    //   "Tertre Rougue",
    //   "1st chicane",
    //   "",
    //   "",
    //   "2nd chicane",
    //   "",
    //   "",
    //   "",
    //   "Mulsanne",
    //   "",
    //   "Indianapolis",
    //   "Arnage",
    //   "Porsche curve 1",
    //   "Porsche curve 2",
    //   "Porsche curve 2",
    //   "Esses du Karting",
    //   "Corvette curve",
    //   "Ford curves"
    // ]

    return (
      <div className="wrapper">
      {!this.state.authUser ? <NotLoggedIn/> :
        <div className="track-wrapper">
        <div className="track">
          <ImageMapper
            className="container"
            src={URL}
            map={MAP}
            width={canvasWidth-460}
            imgWidth={1580}
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

export default LaSarthe;
