import { createSlice } from '@reduxjs/toolkit'
import { Corner, Corners, Observations } from '../utils/types'

export interface TracksState {
  editingCorner: Corner | null
  editingObservation: Observations | null
}

const initialState: TracksState = {
  editingCorner: null,
  editingObservation: null,
}

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    editCorner: (state, action) => {
      state.editingCorner = action.payload
    },
    editObservation: (state, action) => {
      state.editingObservation = action.payload
    },
    finishEditing: (state: TracksState) => {
      return initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const { editCorner, editObservation, finishEditing } =
  tracksSlice.actions

export default tracksSlice.reducer
