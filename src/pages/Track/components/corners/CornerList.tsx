import { Key } from 'react'

import { Corner, TypeOfEntry } from '../../../../app/utils/types'
import { CornerItem } from './CornerItem'

type Props = {
  corners: Corner[]
  handleDelete: (type: keyof typeof TypeOfEntry, id: string) => void
  setTrackCurrentId: (type: keyof typeof TypeOfEntry, id: string) => void
}
export const CornerList = (props: Props) => {
  const { corners, handleDelete, setTrackCurrentId } = props

  return (
    <div>
      {Object.entries(corners).map((corner, key: Key) => {
        return (
          <CornerItem
            key={key}
            name={corner[0]}
            notes={corner[1]}
            onDelete={handleDelete}
            setTrackCurrentId={setTrackCurrentId}
          />
        )
      })}
    </div>
  )
}
