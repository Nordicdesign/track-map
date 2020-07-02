import React from 'react';

export function ObservationList(props) {
  let date = new Date(props.name)
  date = date.toLocaleString()
  return (
    <div className="obs-entry">
      <p className="obs-name">{date}</p>
      <p>{props.notes}</p>
      {props.setup === '' ? "" : (
        <>
        <h4>Setup name</h4>
        <p>{props.setup}</p>
        </>
      )}

    </div>
  )
}

export function NoObservations() {
  return (
    <p>Add some observations</p>
  )
}
