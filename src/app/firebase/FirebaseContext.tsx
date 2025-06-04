import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import { firebaseConfig } from "../../constants/firebase";
import { Database, getDatabase } from "firebase/database";

interface IFirebase {
  database: Database;
}

const FirebaseContext = createContext<IFirebase | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const FirebaseProvider = (props: Props) => {
  const { children } = props;

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const value = {
    database,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error("useFirebase must be used inside FirebaseContext");
  }

  return {
    ...context,
  };
};
