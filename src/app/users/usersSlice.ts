import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface UserState {
  userID: string | null | undefined
  userEmail: string | null | undefined
}

const initialState: UserState = {
  userID: null,
  userEmail: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state: UserState, action: PayloadAction<UserState>) => {
      state.userID = action.payload.userID
      state.userEmail = action.payload.userEmail
    },
    logOut: (state: UserState) => {
      return initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const { signIn, logOut } = userSlice.actions

// selectors
export const selectEditingCorner = (state: RootState) =>
  state.tracks.editingCorner
export const selectEditingObservation = (state: RootState) =>
  state.tracks.editingObservation

export default userSlice.reducer
