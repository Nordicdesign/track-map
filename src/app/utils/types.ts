export interface Corner {
  [key: string]: {
    notes: string
  }
}
export interface Session {
  corners: Corner[] | undefined
  id: string
  name: string
  observations: Setup | undefined
}

export type Setup = {
  [id: string]: {
    notes: string
    setupName: string
    time: number
  }
}

export interface Note {
  note: string
}

export enum TypeOfEntry {
  observations = 'observations',
  corners = 'corners',
}
