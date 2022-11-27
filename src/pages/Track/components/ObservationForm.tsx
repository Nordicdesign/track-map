import React, { useState, useEffect } from 'react'
import { Corners } from '../../../app/utils/types'

// a lot from http://www.codaffection.com/react/react-firebase-crud/

type Props = {
  currentId: any
  observations: any
  handleObservationChange: (ojb: { notes: string; setupName: string }) => void
  handleCancel: any
}

export const ObservationForm: React.FC<Props> = (props) => {
  const { currentId, observations, handleObservationChange, handleCancel } =
    props

  const initialFieldValues = {
    notes: '',
    setupName: '',
  }

  const [values, setValues] = useState(initialFieldValues)

  useEffect(() => {
    if (currentId === '') {
      setValues({ ...initialFieldValues })
    } else {
      setValues({
        ...observations[currentId],
      })
    }
  }, [currentId, observations])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleObservationChange(values)
  }

  return (
    <div className="new-observation">
      <form onSubmit={handleFormSubmit} method="post" autoComplete="off">
        <fieldset>
          <ul>
            <li>
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={values.notes}
                onChange={handleChange}
                rows={6}
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
                value={currentId === '' ? 'Add' : 'Edit'}
                className="button-submit"
              />
              <button
                className="button-link"
                data-testid="cancel-button"
                onClick={() => handleCancel('notes')}
              >
                Cancel
              </button>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  )
}
