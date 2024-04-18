import { TypeOfEntry } from '../../../../app/utils/types'

type Props = {
  name: string
  notes: any
  onDelete: (type: keyof typeof TypeOfEntry, name: string) => void
  setTrackCurrentId: (type: keyof typeof TypeOfEntry, name: string) => void
}

export const CornerItem = (props: Props) => {
  const { name, notes, onDelete, setTrackCurrentId } = props

  return (
    <div className="corner-entry">
      <p className="corner-number">T{name}</p>
      <p className="corner-notes">{notes.notes}</p>
      <div className="corner-actions">
        <button
          className="button-icon"
          onClick={() => setTrackCurrentId('corners', name)}
          aria-label="edit"
        >
          <div className="icon icon-pencil-square"></div>
        </button>
        <button
          className="button-icon"
          onClick={() => onDelete('corners', name)}
          aria-label="delete"
        >
          <div className="icon icon-trash"></div>
        </button>
      </div>
    </div>
  )
}
