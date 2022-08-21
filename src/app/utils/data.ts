import firebase from 'firebase/app'
import 'firebase/database'
import { entryType, SessionType } from './types'

export function loadData(props: {
  authUser: string
  trackID: string
  onResult: (sessions: SessionType[]) => void
}) {
  const { authUser, trackID, onResult } = props
  firebase
    .database()
    .ref(`/users/${authUser}/tracks/${trackID}/sessions`)
    .on('value', function (snapshot) {
      // check if there are any sessions yet
      if (!snapshot.exists()) {
        console.log('there are no sessions!!! 😱')
        initiateSession(authUser, trackID, onResult)
      } else {
        onResult(prepareSessions(snapshot))
      }
    })
}

export function detachListener(props: { authUser: any; trackID: any }) {
  const { authUser, trackID } = props
  firebase.database().ref(`/users/${authUser}/tracks/${trackID}/sessions`).off()
}

export function initiateSession(
  authUser: string,
  trackID: string,
  onResult: (sessions: SessionType[]) => void,
) {
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
      onResult(prepareSessions(snapshot))
    })
}

export function newSession(authUser: string, trackID: string, value: any) {
  const newSession = firebase
    .database()
    .ref(`/users/${authUser}/tracks/${trackID}/sessions/`)
    .push()
  newSession.set({
    name: value,
  })
  console.log('session created ✅')
}

export function prepareSessions(snapshot: firebase.database.DataSnapshot) {
  const data = snapshot.val()
  const sessions = []
  for (const session in data) {
    sessions.push({
      id: session,
      name: data[session].name,
      corners: data[session].corners,
      observations: data[session].observations,
    })
  }

  return sessions
}

export function recordObservation(
  authUser: string | null,
  trackID: string,
  session: string | null,
  data: { notes: any; setupName: string; time: number },
) {
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
      if (err) console.error(err)
    })
  return {
    observations: data,
  }
}
export function editObservation(
  authUser: string,
  trackID: string,
  session: string | null,
  id: string,
  data: { notes: any; setupName: string; time: number },
) {
  firebase
    .database()
    .ref(
      `/users/${authUser}/tracks/${trackID}/sessions/${session}/observations/${id}`,
    )
    .set(data, (err) => {
      if (err) {
        console.error(err)
      } else {
        return {
          observations: data,
        }
      }
    })
}

export function deleteEntry(
  authUser: string,
  trackID: string,
  session: string | null,
  type: keyof typeof entryType,
  id: string,
) {
  firebase
    .database()
    .ref(
      `users/${authUser}/tracks/${trackID}/sessions/${session}/${type}/${id}`,
    )
    .remove((err) => {
      if (err) console.error(err)
    })
}

export function recordCorner(
  authUser: string,
  trackID: string,
  session: string | null,
  corner: any,
  data: any,
) {
  firebase
    .database()
    .ref(
      `/users/${authUser}/tracks/${trackID}/sessions/${session}/corners/${corner}`,
    )
    .set(data, (err) => {
      if (err) console.error(err)
    })
  return {
    corners: data,
  }
}

export function renameSession(
  authUser: string,
  trackID: string,
  currentSessionId: string | null,
  value: string,
) {
  firebase
    .database()
    .ref(`/users/${authUser}/tracks/${trackID}/sessions/${currentSessionId}`)
    .set(
      {
        name: value,
      },
      (err) => {
        if (err) console.error(err)
      },
    )
}
