export interface FirebaseSession {
  [key: string]: {
    name: string;
    observations?: {
      [key: string]: Observation;
    };
    corners?: Array<Corner | null>;
  };
}

export interface Observation {
  notes: string;
  setupName: string;
  time: number;
}

export interface Corner {
  notes: string;
}
