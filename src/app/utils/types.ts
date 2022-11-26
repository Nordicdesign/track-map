// export type Corner = Record<string, string>
export interface Session {
  id: string
  name: string
  corners: Corners | undefined
  observations: Observations | undefined
}

export type Corners = {
  [key: string]: {
    notes: string
  }
}
export type Observations = {
  [id: string]: {
    notes: string
    setupName: string
    time: number
  }
}

export enum Entry {
  observations = 'observations',
  corners = 'corners',
}

export type TrackMetadata = {
  name: string
  url: string
  imgCC?: string
  imgAuthor?: string
}

export type TrackMetadataList = Record<string, TrackMetadata>
