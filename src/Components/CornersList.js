import React from 'react';

export function CornersList(props) {
  let { name, notes, onDelete, setCurrentId } = props

  return (
    <div className="corner-entry">
      <p className="corner-number">T{name}</p>
      <p className="corner-notes">{notes.notes}</p>
      <div className="corner-actions">
        <button className="button-icon" onClick={() => setCurrentId('corners',name)}><div className="icon icon-pencil-square"></div></button>
        <button className="button-icon" onClick={() => onDelete('corners', name)}><div className="icon icon-trash"></div></button>
      </div>
    </div>
  )
}

export function NoCorners() {
  return (
    <p>Add some corner data</p>
  )
}
