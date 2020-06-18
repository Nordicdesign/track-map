import React from 'react';

export default function AddNewObservation(props) {
  return (
    <div className="new-observation">
      <form onSubmit={props.handleCreateObservation}>
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
