import React from 'react'

interface CornerListProps {
  name: string
  notes: any //{ notes: string }
  onDelete: (type: string, name: string) => void
  setTrackCurrentId: (type: string, name: string) => void
}

export const CornersList = (props: CornerListProps) => {
  const { name, notes, onDelete, setTrackCurrentId } = props

  return (
    <div className="corner-entry">
      <p className="corner-number">T{name}</p>
      <p className="corner-notes">{notes.notes}</p>
      <div className="corner-actions">
        <button
          className="button-icon"
          onClick={() => setTrackCurrentId('corners', name)}
        >
          <div className="icon icon-pencil-square"></div>
        </button>
        <button
          className="button-icon"
          onClick={() => onDelete('corners', name)}
        >
          <div className="icon icon-trash"></div>
        </button>
      </div>
    </div>
  )
}

export const NoCorners = () => <p>Add some corner data</p>
