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
  observations: object | undefined
}

export interface NoteType {
  note: string
}