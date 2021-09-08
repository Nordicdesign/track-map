import React, { useState, useEffect } from 'react';

// a lot from http://www.codaffection.com/react/react-firebase-crud/

const AddNewObservation = (props) => {

  let { currentId, observations, addOrEdit, handleCancel } = props

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
      let { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    addOrEdit(values)
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
              data-testid="observation-textarea"
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
              data-testid="setup-name"
             />
          </li>
          <li className="form-actions">
            <input
              type="submit"
              value={currentId === "" ? "Add" : "Edit"}
              className="button-submit"
            />
          <button className="button-link" data-testid="cancel-button" onClick={() => handleCancel('notes')}>Cancel</button>
          </li>
        </ul>
      </fieldset>
      </form>
    </div>
  )
}

const AddNewCorner = (props) => {

  let { currentId, corners, addOrEditCorner, handleCancel } = props

  const initialFieldValues = {
    notes: '',
    number: ''
  }

  var [values, setValues] = useState(initialFieldValues)

  useEffect(() => {
    if (currentId === '') {
      setValues({ ...initialFieldValues})
    }
    else {
      setValues({
        ...corners[currentId],
        number: currentId
      })
    }
  }, [currentId, corners])

  const handleChange = e => {
      var { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    addOrEditCorner(values.number, values.notes);
  }

  return (
    <div className="new-corner">
      <form onSubmit={handleFormSubmit} formMethod="post" autoComplete="off">
      <fieldset>
        <ul>
          <li>
            <label htmlFor="number">Turn #</label>
            <input
              type="number"
              id="number"
              name="number"
              value={values.number}
              onChange={handleChange}
              />
          </li>
          <li>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={values.notes}
              onChange={handleChange}
              rows="4"
              />
          </li>
          <li className="form-actions">
            <input
              type="submit"
              value={currentId === "" ? "Add corner" : "Edit"}
              className="button-submit"
            />
          <button className="button-link" onClick={() => handleCancel('corner')}>Cancel</button>
          </li>
        </ul>
      </fieldset>
      </form>
    </div>
  )
}

export { AddNewObservation, AddNewCorner }
