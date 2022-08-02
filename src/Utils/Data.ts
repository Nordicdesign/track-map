import firebase from 'firebase/app'
import 'firebase/database'

export function loadData(props: { authUser: any; trackID: any; onResult: any }) {
  const { authUser, trackID, onResult } = props
  firebase
    .database()
    .ref(`/users/${authUser}/tracks/${trackID}/sessions`)
    .on('value', function (snapshot) {
      // check if there are any sessions yet
      if (!snapshot.val()) {
        console.log('there are no sessions!!! 😱')
        initiateSession(authUser, trackID, onResult)
      } else {
        // the session actually exists
        onResult(saveDataInState(snapshot))
      }
    })
}

export function detachListener(props: { authUser: any; trackID: any }) {
  const { authUser, trackID } = props
  firebase.database().ref(`/users/${authUser}/tracks/${trackID}/sessions`).off()
  // console.log("Firebase detached");
}

export function initiateSession(authUser: string, trackID: string, onResult: (arg0: { corners: any; observations: any; sessions: { id: string; name: any; corners: any; observations: any }[]; currentSession: { id: string; name: any; corners: any; observations: any }[] }) => void) {
  const newSession = firebase
    .database()
    .ref('/users/' + authUser + '/tracks/' + trackID + '/sessions/')
    .push()
  newSession.set({
    name: 'default',
  })
  console.log('session created ✅')

  firebase
    .database()
    .ref(`/users/${authUser}/tracks/${trackID}/sessions`)
    .on('value', function (snapshot) {
      onResult(saveDataInState(snapshot))
    })
}

export function newSession(authUser: any, trackID: any, value: any) {
  const newSession = firebase
    .database()
    .ref(`/users/${authUser}/tracks/${trackID}/sessions/`)
    .push()
  newSession.set({
    name: value,
  })
  console.log('session created ✅')
}

export function saveDataInState(snapshot: firebase.database.DataSnapshot) {
  // if no data exists have an empty array/object, rather than null
  let corners
  let observations = []
  const sessions = []
  const data = snapshot.val()

  for (const session in data) {
    sessions.push({
      id: session,
      name: data[session].name,
      corners: data[session].corners,
      observations: data[session].observations,
    })
  }

  // // current state
  const currentSession = sessions.slice(-1)
  if (typeof currentSession[0].corners !== 'undefined') {
    corners = currentSession[0].corners
  }

  if (typeof currentSession[0].observations !== 'undefined') {
    // keep as an object
    observations = currentSession[0].observations
  }

  return {
    corners,
    observations,
    sessions,
    currentSession,
  }
}

export function recordObservation(authUser: string | null, trackID: string, session: string | null, data: { notes: any; setupName: any; time: number }) {
  firebase
    .database()
    .ref(
      '/users/' +
        authUser +
        '/tracks/' +
        trackID +
        '/sessions/' +
        session +
        '/observations/',
    )
    .push(data, (err) => {
      if (err) console.log(err)
    })
  return {
    observations: data,
  }
}
export function editObservation(authUser: string, trackID: any, session: any, id: string, data: { notes: any; setupName: any; time: number }) {
  firebase
    .database()
    .ref(
      `/users/${authUser}/tracks/${trackID}/sessions/${session}/observations/${id}`,
    )
    .set(data, (err) => {
      if (err) console.log(err)
    })
  return {
    observations: data,
  }
}

export function deleteEntry(authUser: any, trackID: any, session: any, type: any, id: any) {
  firebase
    .database()
    .ref(
      `users/${authUser}/tracks/${trackID}/sessions/${session}/${type}/${id}`,
    )
    .remove((err) => {
      if (err) console.log(err)
    })
}

export function recordCorner(authUser: any, trackID: any, session: any, corner: any, data: any) {
  firebase
    .database()
    .ref(
      `/users/${authUser}/tracks/${trackID}/sessions/${session}/corners/${corner}`,
    )
    .set(data, (err) => {
      if (err) console.log(err)
    })
  return {
    corners: data,
  }
}

export function renameSession(authUser: any, trackID: any, session: any, value: any) {
  firebase
    .database()
    .ref(`/users/${authUser}/tracks/${trackID}/sessions/${session}`)
    .set(
      {
        name: value,
      },
      (err) => {
        if (err) console.log(err)
      },
    )
}

// import firebase from 'firebase/app'
// import 'firebase/database'

// class Data {
//   constructor(data) {
//     this.data = data
//   }

//   loadData(props) {
//     let { authUser, trackID, onResult } = props
//     let that = this
//     firebase
//       .database()
//       .ref(`/users/${authUser}/tracks/${trackID}/sessions`)
//       .on('value', function (snapshot) {
//         // check if there are any sessions yet
//         if (!snapshot.val()) {
//           console.log('there are no sessions!!! 😱')
//           that.initiateSession(authUser, trackID, onResult)
//         } else {
//           // the session actually exists
//           onResult(that.saveDataInState(snapshot))
//         }
//       })
//   }

//   detachListener(props) {
//     let { authUser, trackID } = props
//     firebase
//       .database()
//       .ref(`/users/${authUser}/tracks/${trackID}/sessions`)
//       .off()
//     // console.log("Firebase detached");
//   }

//   initiateSession(authUser, trackID, onResult) {
//     let newSession = firebase
//       .database()
//       .ref('/users/' + authUser + '/tracks/' + trackID + '/sessions/')
//       .push()
//     newSession.set({
//       name: 'default',
//     })
//     console.log('session created ✅')

//     let that = this
//     firebase
//       .database()
//       .ref(`/users/${authUser}/tracks/${trackID}/sessions`)
//       .on('value', function (snapshot) {
//         onResult(that.saveDataInState(snapshot))
//       })
//   }

//   newSession(authUser, trackID, value) {
//     let newSession = firebase
//       .database()
//       .ref(`/users/${authUser}/tracks/${trackID}/sessions/`)
//       .push()
//     newSession.set({
//       name: value,
//     })
//     console.log('session created ✅')
//   }

//   saveDataInState(snapshot) {
//     // if no data exists have an empty array/object, rather than null
//     let corners
//     let observations = []
//     let sessions = []
//     let data = snapshot.val()

//     for (let session in data) {
//       sessions.push({
//         id: session,
//         name: data[session].name,
//         corners: data[session].corners,
//         observations: data[session].observations,
//       })
//     }

//     // // current state
//     let currentSession = sessions.slice(-1)
//     if (typeof currentSession[0].corners !== 'undefined') {
//       corners = currentSession[0].corners
//     }

//     if (typeof currentSession[0].observations !== 'undefined') {
//       // keep as an object
//       observations = currentSession[0].observations
//     }

//     return {
//       corners,
//       observations,
//       sessions,
//       currentSession,
//     }
//   }

//   recordObservation(authUser, trackID, session, data) {
//     firebase
//       .database()
//       .ref(
//         '/users/' +
//           authUser +
//           '/tracks/' +
//           trackID +
//           '/sessions/' +
//           session +
//           '/observations/',
//       )
//       .push(data, (err) => {
//         if (err) console.log(err)
//       })
//     return {
//       observations: data,
//     }
//   }
//   editObservation(authUser, trackID, session, id, data) {
//     firebase
//       .database()
//       .ref(
//         `/users/${authUser}/tracks/${trackID}/sessions/${session}/observations/${id}`,
//       )
//       .set(data, (err) => {
//         if (err) console.log(err)
//       })
//     return {
//       observations: data,
//     }
//   }

//   deleteEntry(authUser, trackID, session, type, id) {
//     firebase
//       .database()
//       .ref(
//         `users/${authUser}/tracks/${trackID}/sessions/${session}/${type}/${id}`,
//       )
//       .remove((err) => {
//         if (err) console.log(err)
//       })
//   }

//   recordCorner(authUser, trackID, session, corner, data) {
//     firebase
//       .database()
//       .ref(
//         `/users/${authUser}/tracks/${trackID}/sessions/${session}/corners/${corner}`,
//       )
//       .set(data, (err) => {
//         if (err) console.log(err)
//       })
//     return {
//       corners: data,
//     }
//   }

//   renameSession(authUser, trackID, session, value) {
//     firebase
//       .database()
//       .ref(`/users/${authUser}/tracks/${trackID}/sessions/${session}`)
//       .set(
//         {
//           name: value,
//         },
//         (err) => {
//           if (err) console.log(err)
//         },
//       )
//   }
// }

// export default Data
