import { getDatabase, ref } from "firebase/database";

export const useTrack = () => {
  const getSessionsReference = (props: {
    authUser: string;
    trackID: string;
  }) => {
    const { authUser, trackID } = props;
    const db = getDatabase();
    return ref(db, `/users/${authUser}/tracks/${trackID}/sessions`);
  };

  return { getSessionsReference };
};
