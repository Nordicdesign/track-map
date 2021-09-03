import React from 'react';

const ObservationList = (props:any) => {
  let { name, id, notes, setupName, onDelete, setTrackCurrentId } = props
  let date = new Date(name)
  let presentableDate = date.toLocaleString()

  return (
    <div className="obs-entry">
      <div className="obs-entry-header">
        <p className="obs-name">{presentableDate}</p>
        <div>
          <button className="button-icon" onClick={() => setTrackCurrentId('notes',id)}><div className="icon icon-pencil-square"></div></button>
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
