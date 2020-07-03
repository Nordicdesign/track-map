import React, { useState, useEffect } from 'react';

// a lot from http://www.codaffection.com/react/react-firebase-crud/

const AddNewObservation = (props) => {

  let { currentId, observations, addOrEdit, handleCancelObservation } = props

  const initialFieldValues = {
    notes: '',
    setupName: ''
  }

  var [values, setValues] = useState(initialFieldValues)

  useEffect(() => {
    if (currentId === '') {
      setValues({ ...initialFieldValues})
    }
    else {
      setValues({
        ...observations[currentId]
      })
    }
  }, [currentId, observations])

  const handleChange = e => {
      var { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    addOrEdit(values);
  }

  return (
    <div className="new-observation">
      <form onSubmit={handleFormSubmit} formMethod="post" autoComplete="off">
      <fieldset>
        <ul>
          <li>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={values.notes}
              onChange={handleChange}
              rows="6"
              />
          </li>
          <li>
            <label htmlFor="setupName">Setup name (optional)</label>
            <input
              type="text"
              name="setupName"
              id="setupName"
              value={values.setupName}
              onChange={handleChange}
             />
          </li>
          <li className="form-actions">
            <input
              type="submit"
              value={currentId === "" ? "Add" : "Edit"}
              className="button-submit"
            />
            <button className="button-link" onClick={handleCancelObservation}>Cancel</button>
          </li>
        </ul>
      </fieldset>
      </form>
    </div>
  )
}

const AddNewCorner = (props) => {

  const initialFieldValues = {
    notes: '',
    setupName: ''
  }

  var [values, setValues] = useState(initialFieldValues)

  const handleInputChange = e => {
      var { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    console.log(values);
  }

  return (
    <div className="new-corner">
      <form onSubmit={handleFormSubmit} formMethod="post" autoComplete="off">
      <fieldset>
        <ul>
          <li>
            <label htmlFor="number">Turn #</label>
            <input
              type="text"
              id="number"
              name="number"
              value={values.number}
              onChange={handleInputChange}
              />
          </li>
          <li>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={values.notes}
              onChange={handleInputChange}
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

export { AddNewObservation, AddNewCorner }
