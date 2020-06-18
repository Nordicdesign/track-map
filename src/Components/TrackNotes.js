import React, { Component } from 'react';
import * as firebase from 'firebase/app'
import "firebase/database"
import update from 'immutability-helper'
import NotLoggedIn from './NotLoggedIn'
import Drawer from './Drawer'
import CornerLogs from './CornerLogs'
import renderIf from 'render-if'
import SessionCreator from './SessionCreator'
import SessionSelection from './SessionSelection'
import Data from '../Utils/Data'

const data = new Data();

let dataIsReady = false;

class TrackNotes extends Component {

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
    const {trackID,trackName} = this.props;

    // first time only, when the user loads the page and they are logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var userEmail = user.email;
        var uid = user.uid;
        that.setState({
          authUser: uid,
          userEmail: userEmail
        }, function() {
          // get the data - NOT SURE WHAT THIS ID
          // var updates = {};
          // updates['/users/'+ this.state.authUser +'/tracks/'+ trackID +'/name'] = trackName;
          // firebase.database().ref().update(updates);

          // load in state
          that.setState({
            // clear the data first, because of the merge
            turns: Array(that.props.numberTurns).fill({},1),
          }, () => {
            // const values = data.loadData()
            data.loadData(uid, trackID, function(values) {
              that.setState({
                sessions: values.newState,
                currentSession: values.newState[0].id,
                turns: update(that.state.turns, {$merge: values.turns})
              },() => {
                dataIsReady = true;
                // console.log("turns loaded",that.state.turns);
              })
            })
          })
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

  registerNotes(e, turnID) {
    const {trackID} = this.props
    const {authUser, currentSession} = this.state
    var updates = {};
    updates['/users/'+ authUser +'/tracks/'+ trackID + '/sessions/' + currentSession + '/turn/' + turnID + '/notes'] = e.target.value;
    return firebase.database().ref().update(updates);
  }

  render() {
    const {trackID, trackName} = this.props
    const {turns} = this.state

    return (
      <div className="trackNotes">

        {!this.state.authUser ? <NotLoggedIn/> :
          <>
          <div className="sessions">
            <SessionSelection
              sessions={this.state.sessions}
              currentSession={this.state.currentSession}
              changeSession={this.changeSession}
            />
            <SessionCreator
              trackID={this.props.trackID}
              numberTurns={this.props.numberTurns}
              authUser={this.state.authUser}
              loadData={this.loadData}
             />
          </div>

          {turns.map((data, index) => {
            return <CornerLogs
              turn={index}
              data={data}
              registerNotes={(e) => this.registerNotes(e, index)}
              />
          })}

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
          </>

        }
      </div>
    )
  }
}

export default TrackNotes
