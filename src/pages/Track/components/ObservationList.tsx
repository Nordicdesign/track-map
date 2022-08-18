import React from 'react'
import { entryType } from '../../../app/utils/types'

type Props = {
  name: string
  id: string
  notes: any
  setupName: string
  onDelete: (type: keyof typeof entryType, id: string) => void
  setTrackCurrentId: any
}

export const ObservationList = (props: Props) => {
  const { name, id, notes, setupName, onDelete, setTrackCurrentId } = props
  const date = new Date(name)
  const presentableDate: string = date.toLocaleString()

  return (
    <div className="obs-entry">
      <div className="obs-entry-header">
        <p className="obs-name">{presentableDate}</p>
        <div>
          <button
            className="button-icon"
            onClick={() => setTrackCurrentId('notes', id)}
          >
            <div className="icon icon-pencil-square"></div>
          </button>
          <button
            className="button-icon"
            onClick={() => onDelete('observations', id)}
          >
            <div className="icon icon-trash"></div>
          </button>
        </div>
      </div>

      <p>{notes}</p>
      {setupName === '' ? (
        ' '
      ) : (
        <>
          <h4>Setup name</h4>
          <p>{setupName}</p>
        </>
      )}
    </div>
  )
}

export const NoObservations = () => {
  return <p>Add some observations</p>
}