import { child, getDatabase, ref, set } from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { TypeOfEntry, Session } from "./types";
import { FirebaseSession } from "../../types/session";

export const initiateSession = async (authUser: string, trackID: string) => {
  const dbRef = ref(getDatabase());
  await set(child(dbRef, `/users/${authUser}/tracks/${trackID}/sessions`), {
    name: "default",
  });
};

export function newSession(authUser: string, trackID: string, value: any) {
  const database = firebase.database();
  const newSession = database
    .ref(`/users/${authUser}/tracks/${trackID}/sessions/`)
    .push();
  newSession.set({
    name: value,
  });
}

export function prepareSessions(data: FirebaseSession) {
  const sessions: Session[] = [];
  for (const session in data) {
    sessions.push({
      id: session,
      name: data[session].name,
      // @ts-expect-error corners is not null
      corners: data[session].corners ? data[session].corners : [],
      observations: data[session].observations,
    });
  }

  return sessions;
}

export function recordObservation(
  authUser: string | null,
  trackID: string,
  session: string | null,
  data: { notes: any; setupName: string; time: number },
) {
  const database = firebase.database();
  database
    .ref(
      "/users/" +
        authUser +
        "/tracks/" +
        trackID +
        "/sessions/" +
        session +
        "/observations/",
    )
    .push(data, (err) => {
      // eslint-disable-next-line no-console
      if (err) console.error(err);
    });
  return {
    observations: data,
  };
}
export function editObservation(
  authUser: string,
  trackID: string,
  session: string | null,
  id: string,
  data: { notes: any; setupName: string; time: number },
) {
  const database = firebase.database();
  database
    .ref(
      `/users/${authUser}/tracks/${trackID}/sessions/${session}/observations/${id}`,
    )
    .set(data, (err) => {
      if (err) {
        console.error(err);
      } else {
        return {
          observations: data,
        };
      }
    });
}

export function deleteEntry(
  authUser: string,
  trackID: string,
  session: string | null,
  type: keyof typeof TypeOfEntry,
  id: string,
) {
  const database = firebase.database();
  database
    .ref(
      `users/${authUser}/tracks/${trackID}/sessions/${session}/${type}/${id}`,
    )
    .remove((err) => {
      if (err) console.error(err);
    });
}

export function recordCorner(
  authUser: string,
  trackID: string,
  session: string | null,
  corner: any,
  data: any,
) {
  const database = firebase.database();
  database
    .ref(
      `/users/${authUser}/tracks/${trackID}/sessions/${session}/corners/${corner}`,
    )
    .set(data, (err) => {
      if (err) console.error(err);
    });
  return {
    corners: data,
  };
}

export function renameSession(
  authUser: string,
  trackID: string,
  currentSessionId: string | null,
  value: string,
) {
  const database = firebase.database();
  database
    .ref(`/users/${authUser}/tracks/${trackID}/sessions/${currentSessionId}`)
    .set(
      {
        name: value,
      },
      (err) => {
        if (err) console.error(err);
      },
    );
}
