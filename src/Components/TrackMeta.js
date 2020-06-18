import React from 'react';
import * as firebase from 'firebase/app'
import "firebase/database"
import update from 'immutability-helper'
import NotLoggedIn from './NotLoggedIn'
import SessionCreator from './SessionCreator'
import SessionSelection from './SessionSelection'
import Data from '../Utils/Data'

const data = new Data();

const changeSession = (event) => {
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

export default TrackMeta(props) {

    const {trackID, trackName} = this.props

    return (
      <div className="trackNotes">
        <h1>{trackName}</h1>
        {!this.state.authUser ? <NotLoggedIn/> :
          <>
          <div className="sessions">
            <SessionSelection
              sessions={this.state.sessions}
              currentSession={this.state.currentSession}
              changeSession={this.changeSession}
            />
            <SessionCreator
              trackID={trackID}
              authUser={this.state.authUser}
              loadData={this.loadData}
             />
          </div>
          </>
        }
      </div>
    )
  };
