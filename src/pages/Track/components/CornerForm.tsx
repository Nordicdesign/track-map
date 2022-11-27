import React, { useRef } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectEditingCorner } from '../../../app/users/usersSlice'

// a lot from http://www.codaffection.com/react/react-firebase-crud/
type Props = {
  addOrEditCorner: (corner: string, notes: string) => void
  handleCancel: () => void
}

export const CornerForm: React.FC<Props> = (props) => {
  const { addOrEditCorner, handleCancel } = props

  const editingCorner = useAppSelector(selectEditingCorner)
  const CornerRef = useRef<HTMLInputElement | null>(null)
  const NotesRef = useRef<HTMLTextAreaElement | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cornerNumber = CornerRef.current?.value
    const notes = NotesRef.current?.value

    if (!cornerNumber || !notes) {
      return
    }

    // TODO: add data validation

    addOrEditCorner(cornerNumber, notes)
  }

  return (
    <div className="new-corner">
      <form onSubmit={handleSubmit} method="post" autoComplete="off">
        <fieldset>
          <ul>
            <li>
              <label htmlFor="number">Turn #</label>
              <input
                type="number"
                id="number"
                name="number"
                ref={CornerRef}
                defaultValue={editingCorner?.corner}
              />
            </li>
            <li>
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                ref={NotesRef}
                rows={4}
                defaultValue={editingCorner?.notes}
              />
            </li>
            <li className="form-actions">
              <input
                type="submit"
                value={editingCorner ? 'Edit' : 'Add corner'}
                className="btn"
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
