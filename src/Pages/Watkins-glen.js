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
let trackName= "Watkins Glen";
let trackID= "3";
let URL = "/images/Watkins_Glen_International_Track_Map.svg";
let MAP = {
  name: "my-map",
  areas: [
    { name: "1", shape: "circle", coords: [113,342,35], fillColor: "rgba(0, 0, 0, 0.25)"  },
    { name: "2", shape: "circle", coords: [56,180,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "3", shape: "circle", coords: [182,147,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "4", shape: "circle", coords: [304,35,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "5", shape: "circle", coords: [911,71,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "6", shape: "circle", coords: [823,285,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "7", shape: "circle", coords: [963,362,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "8", shape: "circle", coords: [557,440,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "9", shape: "circle", coords: [594,274,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "10", shape: "circle", coords: [493,297,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "11", shape: "circle", coords: [434,466,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    // { name: "Bus entry", shape: "rect", coords: [655,59,724,104], fillColor: "rgba(0, 0, 0, 0.25)" },
    // { name: "Bus exit", shape: "rect", coords: [737,49,807,106], fillColor: "rgba(0, 0, 0, 0.25)" },
  ]
}

// const Summary = ({turns}) => {
//   turns.map(function(turn, index) {
//     return (<p>T{index} - {turn.notes}</p>)
//   })
// }

class Watkins extends Component {
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
        // console.log(that.state.turns);
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


    // This just doesn't work at all 😟😟😟😟😟😟
    // let summary = []
    //   let turns = this.state.turns;
    //   console.log(turns);
    //   for (const [index, turn] of turns.entries()) {
    //     turn.notes ?
    //     summary.push(<li key={index}>{turn.notes}</li>) :
    //     false
    //   }

    return (
      <div className="wrapper">
      {!this.state.authUser ? <NotLoggedIn/> :
        <div className="track-wrapper">
          <div className="track">
            <ImageMapper
              src={URL}
              map={MAP}
              width={canvasWidth-500}
              imgWidth={999}
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

export default Watkins;
