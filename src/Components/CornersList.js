import React from 'react';

export function CornersList(props) {
  return (
    <div className="corner-entry">
      <p className="corner-number">{props.name}</p>
      <p>{props.notes.notes}</p>
    </div>
  )
}

export function NoCorners() {
  return (
    <p>Add some corner data</p>
  )
}
