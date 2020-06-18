import React from 'react';

export function AddNewObservation(props) {
  return (
    <div className="new-observation">
      <form onSubmit={props.handleCreateObservation} formMethod="post">
      <fieldset>
        <ul>
          <li>
            <label htmlFor="newObservationNotes">Notes</label>
            <textarea
              id="newObservationNotes"
              name="newObservationNotes"
              value={props.newObservationNotes}
              onChange={props.handleInputChange}
              rows="6"
              />
          </li>
          <li>
            <label htmlFor="newObservationSetupName">Setup name (optional)</label>
            <input
              type="text"
              name="newObservationSetupName"
              id="newObservationSetupName"
              value={props.newObservationSetupName}
              onChange={props.handleInputChange}
             />
          </li>
          <li className="form-actions">
            <input
              type="submit"
              value="Add observation"
              className="button-submit"
            />
            <button className="button-link" onClick={props.handleCancelObservation}>Cancel</button>
          </li>
        </ul>
      </fieldset>
      </form>
    </div>
  )
}

export function AddNewConer(props) {
  return (
    <div className="new-corner">
      <form onSubmit={props.handleCreateCorner} formMethod="post">
      <fieldset>
        <ul>
          <li>
            <label htmlFor="newCornerNumber">Turn #</label>
            <input
              type="text"
              id="newCornerNumber"
              name="newCornerNumber"
              value={props.newCornerNumber}
              onChange={props.handleInputChange}
              />
          </li>
          <li>
            <label htmlFor="newCornerNotes">Notes</label>
            <textarea
              id="newCornerNotes"
              name="newCornerNotes"
              value={props.newCornerNotes}
              onChange={props.handleInputChange}
              rows="4"
              />
          </li>
          <li className="form-actions">
            <input
              type="submit"
              value="Add corner"
              className="button-submit"
            />
            <button className="button-link" onClick={props.handleCancelCorner}>Cancel</button>
          </li>
        </ul>
      </fieldset>
      </form>
    </div>
  )
}
