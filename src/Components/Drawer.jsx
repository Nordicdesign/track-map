import React, { Component } from 'react';
import * as firebase from 'firebase/app'
import "firebase/database"
// import update from 'immutability-helper'
import TrackLogs from './TrackLogs'
import renderIf from 'render-if'

class Drawer extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   turn: '',
    // }
    this.updateTurn = this.updateTurn.bind(this);
    this.registerNotes = this.registerNotes.bind(this);
  }

  // loadData() {
  //   let that = this; //🤯
  //   firebase.database().ref('/users/' + that.props.authUser + '/tracks/'+ that.props.trackID +'/turn/' + that.props.turn).on('value', function(snapshot) {
  //
  //     // if no data exists have an empty object, rather than null
  //     let turn;
  //     !snapshot.val() ? turn = {} : turn = snapshot.val();
  //
  //     that.setState({
  //       turn: update(that.state.turn, {$merge: turn})
  //     }, () => {
  //       console.log(this.state.turn);
  //     })
  //   });
  // }


  registerNotes(event, turnID) {
    var updates = {};
    updates['/users/'+ this.props.authUser +'/tracks/'+ this.props.trackID + '/sessions/' + this.props.currentSession + '/turn/' + turnID + '/notes'] = event.target.value;
    return firebase.database().ref().update(updates);
  }

  updateTurn(turnID, section, behaviour) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/' + this.props.authUser + '/tracks/'+ this.props.trackID + '/sessions/' + this.props.currentSession + '/turn/' + turnID + '/' + section] = behaviour;
    return firebase.database().ref().update(updates);
  }

  // componentDidMount() {
  //   var updates = {};
  //   updates['/users/'+ this.props.authUser +'/tracks/'+ this.props.trackID +'/name'] = this.props.trackName;
  //   firebase.database().ref().update(updates);
  //   this.loadData();
  //   console.log("data loaded");
  // }

  render() {

    var visibility = "hide";

    if (this.props.isOpen) {
      visibility = "show";
    }
    // console.log(this.props.turnsData);

    return (

      <div id="drawer" className={visibility}>
        <button onClick={this.props.onClick}>Close</button>
        <h2>Turn {this.props.turn}</h2>

        {renderIf(visibility === "show")(
          <TrackLogs
            turn={this.props.turn}
            turnsData={this.props.turnsData}
            trackName={this.props.trackName}
            trackID={this.props.trackID}
            updateTurn={this.updateTurn}
            registerNotes={this.registerNotes}
          />
        )}




        <h3>Braking reference point</h3>
        <p>Upload image</p>
      </div>
    );

  }
}

export default Drawer;
