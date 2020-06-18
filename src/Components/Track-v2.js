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

  saveDataInState = (snapshot) => {
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

    if(!turns) {
      turns = []
    }

    // load in state
    this.setState({
      // clear the data first, because of the merge
      turns: Array(this.props.numberTurns).fill({},1),
    }, () => {
      this.setState({
        sessions: newState,
        currentSession: currentState[0].id,
        turns: update(this.state.turns, {$merge: turns})
      },() => {
        dataIsReady = true;
        console.log("turns loaded",this.state.turns);
        setTimeout( () => this.insertOnClick(),500)
      })
    })
  }


  initiateSession = (props) => {
    const trackID = this.props.trackID;
    const authUser = this.state.authUser;
    let newSession = firebase.database().ref('/users/' + authUser + '/tracks/' + trackID + '/sessions/').push();
    newSession.set({
        name: 'default',
    });
    console.log('session created ✅');

    let that = this;
    firebase.database().ref('/users/' + authUser + '/tracks/'+ trackID +'/sessions').on('value', function(snapshot) {
      that.saveDataInState(snapshot)
    })
  }

  loadData = () => {
    // const trackTurns = ["La Source", "", "", "", "Raidillon", "Eau Rouge", "", "Les Combes" ];
    const trackID = this.props.trackID;
    let that = this; //🤯
    firebase.database().ref('/users/' + that.state.authUser + '/tracks/'+ trackID +'/sessions').on('value', function(snapshot) {
      // check if there are any sessions yet
      if (!snapshot.val()) {
        console.log("there are no sessions!!! 😱");
        that.initiateSession();
      } else { // the session actually exists
        that.saveDataInState(snapshot)
      }
    });
  }

  changeSession = (event) => {
    const newSession = event.target.value;

    // the new session to load
    let newState = this.state.sessions.filter(session => session.id === newSession);
    let turns = newState.map((session) => {
      return session.turns
    }).pop();

    if(!turns) { // in case there's no data in firebase
      turns = []
    }
    // load in state
    this.setState({
      // clear the data first, because of the merge
      turns: Array(this.props.numberTurns).fill({},1),
    }, () => {
      this.setState({
        // save the new one
        currentSession: newSession,
        turns: update(this.state.turns, {$merge: turns})
      },() => {
        dataIsReady = true;
        console.log("turns loaded",this.state.turns);
      })
    })

  }

  componentDidMount(props) {
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
  // find the map and add onClick to each area
  insertOnClick() {
    // console.log("hola!");
    let areas = document.getElementsByTagName('area')
    console.log(areas);
    for (let area of areas) {
        // area.setAttribute('onClick', '{area => this.clicked(area)}')
        area.onclick = function() {
          console.log("clicked!");
        }
    }
    // document.querySelector('body').addEventListener('click', function(event) {
    //   if (event.target.tagName.toLowerCase() === 'map') {
    //     console.log("map is here");
    //   }
    // });

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
    const imgMap = this.props.imgMap;
    const trackID = this.props.trackID;
    const trackName = this.props.trackName;


    return (
      <div className="wrapper">
      {!this.state.authUser ? <NotLoggedIn/> :
        <>
        <div className="sessions">
          <SessionCreator
            trackID={this.props.trackID}
            numberTurns={this.props.numberTurns}
            authUser={this.state.authUser}
            loadData={this.loadData}
           />
          <SessionSelection
            sessions={this.state.sessions}
            currentSession={this.state.currentSession}
            changeSession={this.changeSession}
          />
        </div>

        <div className="track-wrapper">
        <div className="track">


          <img src="images/Zolder.svg.png" alt="Zolder track map" useMap="#image-map" />
          <map name="image-map" id="image-map">
            <area target="" href="/" alt="1" title="1" coords="281,216,25" shape="circle" />
            <area target="" alt="2" title="2" coords="138,465,21" shape="circle" />
            <area target="" alt="3" title="3" coords="36,298,23" shape="circle" />
          </map>
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
