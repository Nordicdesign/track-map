import { useState, useEffect } from 'react'

// a lot from http://www.codaffection.com/react/react-firebase-crud/
type Props = {
  currentId: any
  corners: any
  addOrEditCorner: any
  handleCancel: () => void
}

export const AddNewCorner = (props: Props) => {
  const { currentId, corners, addOrEditCorner, handleCancel } = props

  const initialFieldValues = {
    notes: '',
    number: '',
  }

  const [values, setValues] = useState(initialFieldValues)

  useEffect(() => {
    if (currentId === '') {
      setValues({ ...initialFieldValues })
    } else {
      setValues({
        ...corners[currentId],
        number: currentId,
      })
    }
  }, [currentId, corners])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    addOrEditCorner(values.number, values.notes)
  }

  return (
    <div className="new-corner">
      <form onSubmit={handleFormSubmit} method="post" autoComplete="off">
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
                rows={4}
              />
            </li>
            <li className="form-actions">
              <input
                type="submit"
                value={currentId === '' ? 'Add corner' : 'Edit'}
                className="button-submit"
              />
              <button className="button-link" onClick={handleCancel}>
                Cancel
              </button>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  )
}
