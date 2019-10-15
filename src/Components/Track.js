import React, { Component } from 'react';
import * as firebase from 'firebase/app'
import "firebase/database"
import update from 'immutability-helper'
import NotLoggedIn from '../Components/NotLoggedIn'
import ImageMapper from 'react-image-mapper'
import Drawer from '../Components/Drawer'
import Summary from '../Components/Summary'
import renderIf from 'render-if'
import SessionCreator from '../Components/SessionCreator'
import SessionSelection from '../Components/SessionSelection'

let dataIsReady = false;

class Track extends Component {
  constructor(props,context) {
    super(props,context);

    this.state = {
      authUser: null,
      userEmail: null,
      error: null,
      isOpen: false,
      turn: null,
      turns: Array(this.props.numberTurns).fill({},1),
      sessions: [],
      currentSession: null,
    };
    this.clicked = this.clicked.bind(this);
  }

  loadData = (props) => {
    // const trackTurns = ["La Source", "", "", "", "Raidillon", "Eau Rouge", "", "Les Combes" ];
    const trackID = this.props.trackID;

    let that = this; //🤯
    firebase.database().ref('/users/' + that.state.authUser + '/tracks/'+ trackID +'/sessions').on('value', function(snapshot) {
      // if no data exists have an empty object, rather than null
      let newState = [];
      let sessions = snapshot.val();

      for (let session in sessions) {
        newState.push({
          id: session,
          name: sessions[session].name,
          turns: sessions[session].turn
        });
      }

      // current state
      let currentState = newState.slice(-1);
      let turns = currentState.map((session) => {
        return session.turns
      }).pop();

      that.setState({
        sessions: newState,
        currentSession: currentState[0].id,
        turns: update(that.state.turns, {$merge: turns})
      },() => {
        dataIsReady = true;
        console.log("turns loaded",that.state.turns);
      })
    });
  }
  // loadData = (props) => {
  //   // const trackTurns = ["La Source", "", "", "", "Raidillon", "Eau Rouge", "", "Les Combes" ];
  //   const trackID = this.props.trackID;
  //
  //   let that = this; //🤯
  //   firebase.database().ref('/users/' + that.state.authUser + '/tracks/'+ trackID +'/turn').on('value', function(snapshot) {
  //     // if no data exists have an empty object, rather than null
  //     let turns;
  //     !snapshot.val() ? turns = [] : turns = snapshot.val();
  //
  //     console.log("turns loaded", turns);
  //
  //     that.setState({
  //       turns: update(that.state.turns, {$merge: turns})
  //     },() => {
  //       dataIsReady = true;
  //       console.log("data loaded",that.state.turns);
  //     })
  //   });
  // }

  componentWillMount(props) {
    let that = this;
    const trackID = this.props.trackID;
    const trackName = this.props.trackName;
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

  render(props) {
    const canvasWidth = window.innerWidth;
    const canvasMargin = this.props.canvasMargin;
    const imgWidth = this.props.imgWidth;
    const URL = this.props.URL;
    const MAP = this.props.MAP;
    const trackID = this.props.trackID;
    const trackName = this.props.trackName;


    return (
      <div className="wrapper">
      {!this.state.authUser ? <NotLoggedIn/> :
        <>
        <SessionCreator />
        <SessionSelection sessions={this.state.sessions} />
        <div className="track-wrapper">
        <div className="track">
          <ImageMapper
            src={URL}
            map={MAP}
            width={canvasWidth-canvasMargin}
            imgWidth={imgWidth}
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
            currentSession={this.state.currentSession}
          />
        )}
        </div>
        </>

      }
      </div>
    );
  }
}

export default Track;
