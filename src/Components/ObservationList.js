import React from 'react';

const ObservationList = (props) => {
  let { name, id, notes, setupName, onDelete } = props
  let date = new Date(name)
  date = date.toLocaleString()
  return (
    <div className="obs-entry">
      <p className="obs-name">{date}</p>
      <p>{notes}</p>
      {setupName === "" ? " " : (
        <>
        <h4>Setup name</h4>
        <p>{setupName}</p>

        </>
      )}
      <p><button onClick={() => onDelete("observations", id)}>Delete</button></p>
    </div>
  )
}

const NoObservations = () => {
  return (
    <p>Add some observations</p>
  )
}

export { ObservationList, NoObservations }
