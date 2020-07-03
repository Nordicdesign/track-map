import * as firebase from 'firebase/app'
import "firebase/database"

class Data {
  constructor(data) {
    this.data = data
  }

  loadData(authUser, trackID, onResult) {
    let that = this;
    firebase.database().ref('/users/' + authUser + '/tracks/'+ trackID +'/sessions').on('value', function(snapshot) {
      // check if there are any sessions yet
      if (!snapshot.val()) {
        console.log("there are no sessions!!! 😱");
        // that.initiateSession(authUser, trackID);
        that.initiateSession(authUser, trackID, onResult);
      } else { // the session actually exists
        onResult(that.saveDataInState(snapshot))
        // onResult(snapshot.val())
      }
    });
  }

  initiateSession(authUser,trackID, onResult) {
    let newSession = firebase.database().ref('/users/' + authUser + '/tracks/' + trackID + '/sessions/').push();
    newSession.set({
        name: 'default',
    });
    console.log('session created ✅');

    let that = this;
    firebase.database().ref('/users/' + authUser + '/tracks/'+ trackID +'/sessions').on('value', function(snapshot) {
      // onResult(() => return snapshot)
      // return snapshot.val();
      onResult(that.saveDataInState(snapshot))
    })
  }

  saveDataInState(snapshot) {
    // if no data exists have an empty array/object, rather than null
    let corners
    let observations = []
    let sessions = []
    let data = snapshot.val()

    // console.log("the snapshot",data)

    for (let session in data) {
      sessions.push({
        id: session,
        name: data[session].name,
        corners: data[session].corners,
        observations: data[session].observations
      });
    }

    // // current state
    let currentSession = sessions.slice(-1);
    if (typeof currentSession[0].corners !== "undefined") {
      // console.log(currentSession[0].corners);
      // for (let obs in currentSession[0].corners) {
      //   observations.push(currentSession[0].corners[obs])
      // }
      corners = currentSession[0].corners
    }

    if (typeof currentSession[0].observations !== "undefined") {

      // keep as an object
      observations = currentSession[0].observations

      // // turn it into an array
      // for (let obs in currentSession[0].observations) {
      //   observations.push(currentSession[0].observations[obs])
      // }
      //
      // observations = observations.reverse()
    }

    // let data = currentState.map((session) => {
    //   return session.turns
    // }).pop();

    // if(!turns) {
    //   turns = []
    // }

    return {
      corners,
      observations,
      sessions,
      currentSession
    }
  }

  recordObservation(authUser, trackID, session, data) {
    firebase.database().ref('/users/' + authUser + '/tracks/' + trackID + '/sessions/' + session + '/observations/').push(
      data,
      err => {
        if (err) console.log(err);
      }
    );
    return {
      observations: data
    }
  }
  editObservation(authUser, trackID, session, id, data) {
    firebase.database().ref(`/users/${authUser}/tracks/${trackID}/sessions/${session}/observations/${id}`).set(
      data,
      err => {
        if (err) console.log(err);
      }
    );
    return {
      observations: data
    }
  }

  deleteEntry(authUser,trackID, session, type, id) {
    firebase.database().ref(`users/${authUser}/tracks/${trackID}/sessions/${session}/${type}/${id}`).remove(
        err => { if (err) console.log(err) })
  }

  recordCorner(authUser, trackID, session, corner, data) {
    let newData = firebase.database().ref('/users/' + authUser + '/tracks/' + trackID + '/sessions/' + session + '/corners/t' + corner + '/');
    newData.set(data);
    console.log('information recorded ✅');
    return {
      corners: data
    }
  }
}

export default Data
