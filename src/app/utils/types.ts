export interface CornerType {
  [key: string]: {
    notes: string
  }
}
export interface SessionType {
  // [index: string]: object
  corners: CornerType[] | undefined
  id: string
  name: string
  observations: NotesType | undefined
}

export type NotesType = {
  [id: string]: {
    notes: string
    setupName: string
    time: number
  }
}

export interface NoteType {
  note: string
}

export enum entryType {
  observations = 'observations',
  corners = 'corners',
}
