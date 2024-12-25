'use client'
import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './fetuares/userSlice'

export const store = configureStore({
  reducer: {
    users : userSlice.reducer
  },
})