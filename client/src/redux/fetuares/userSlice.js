'use client'

import { getAvatarService } from "@/services/User"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    avatar : ""


}


export const getAvatar = createAsyncThunk('getAvatar', async(token) => {
    const response = await getAvatarService(token)
    if(response) return response
})


export const userSlice = createSlice({
    name : "users",
    initialState,
    reducers : {

    },

    extraReducers : (builder) => {
        builder.addCase(getAvatar.fulfilled, (state,action) => {
            state.avatar = action.payload
        })
    }
})

export default userSlice.reducer