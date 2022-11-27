import { Entry } from '../../../app/utils/types'

type Props = {
  name: string
  notes: {
    notes: string
  }
  onDelete: (type: keyof typeof Entry, name: string) => void
  // setTrackCurrentId: (type: keyof typeof Entry, name: string) => void
  handleEditCorner: (name: string, notes: string) => void
}

export const CornersList: React.FC<Props> = (props) => {
  const { name, notes, onDelete, handleEditCorner } = props

  return (
    <div className="corner-entry">
      <p className="corner-number">T{name}</p>
      <p className="corner-notes">{notes.notes}</p>
      <div className="corner-actions">
        <button
          className="button-icon"
          onClick={() => handleEditCorner(name, notes.notes)}
        >
          <div className="icon icon-pencil-square" role="button">
            edit
          </div>
        </button>
        <button
          className="button-icon"
          onClick={() => onDelete('corners', name)}
        >
          <div className="icon icon-trash" role="button">
            delete
          </div>
        </button>
      </div>
    </div>
  )
}

export const NoCorners = () => <p>Add some corner data</p>
