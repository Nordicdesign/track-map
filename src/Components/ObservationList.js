import React from 'react';

const ObservationList = (props) => {
  let { name, id, notes, setupName, onDelete, setCurrentId } = props
  let date = new Date(name)
  date = date.toLocaleString()

  return (
    <div className="obs-entry">
      <div className="obs-entry-header">
        <p className="obs-name">{date}</p>
        <div>
          <button className="button-icon" onClick={() => setCurrentId(id)}><div className="icon icon-pencil-square"></div></button>
          <button className="button-icon" onClick={() => onDelete("observations", id)}><div className="icon icon-trash"></div></button>
        </div>
      </div>

      <p>{notes}</p>
      {setupName === "" ? " " : (
        <>
        <h4>Setup name</h4>
        <p>{setupName}</p>

        </>
      )}
    </div>
  )
}

const NoObservations = () => {
  return (
    <p>Add some observations</p>
  )
}

export { ObservationList, NoObservations }
