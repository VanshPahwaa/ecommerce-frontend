import { createSlice } from "@reduxjs/toolkit";

import { registerUser, checkUser, updateInUser, isLoggedIn, signOutUser, forgetPasswordRequestAsync, resetPasswordRequestAsync } from "./userApi";


const initialState = {
    loggedInUser: null,
    status: "pending",
    error: null,
    mailSent: null,
    mailStatus: 'idle',
    resetPasswordStatus: "idle",
    resetPassword: null
    // {
    //     "id":"68905a40b4c4e963cf1c6f5c",
    //     "userName":"vnash",
    //     "email":"vanshpahwa77@gmail.com",
    //     "password":"Vansh@123"
    // },
}

const userSlice = createSlice({

    name: 'user',
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null
        }

        // signOutUser: (state) => {
        //     state.loggedInUser = null
        // }
    },
    extraReducers: builder => {
        builder.addCase(registerUser.rejected, (state, action) => {
            state.status = 'idle'
            state.error = action.error.message
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                // state.status = 'idle'
            })
            .addCase(registerUser.pending, (state, action) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.error.message

            })
            .addCase(checkUser.pending, (state, action) => {
                state.status = 'pending'
                state.error = null

            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.status = 'idle'
                state.loggedInUser = action.payload
            })
            .addCase(updateInUser.rejected, (state, action) => {
                state.status = 'idle'

            })
            .addCase(updateInUser.fulfilled, (state, action) => {
                state.status = 'idle'
                console.log("in userSlice updateing loggedInUse")
                state.loggedInUser = action.payload
            })
            .addCase(isLoggedIn.rejected, (state, action) => {
                state.status = 'idle'
                console.log("in rejected Block")
            })
            .addCase(isLoggedIn.fulfilled, (state, action) => {
                state.status = 'idle'
                state.loggedInUser = action.payload
            })
            .addCase(isLoggedIn.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(signOutUser.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.message
            })
            .addCase(signOutUser.fulfilled, (state, action) => {
                state.status = 'idle'
                state.loggedInUser = null
            })
            .addCase(signOutUser.pending, (state, action) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(forgetPasswordRequestAsync.rejected, (state, action) => {
                state.mailStatus = 'idle'
                state.mailSent = action.error.message
            })
            .addCase(forgetPasswordRequestAsync.fulfilled, (state, action) => {
                state.mailStatus = 'idle'
                state.mailSent = action.payload.message
            })
            .addCase(forgetPasswordRequestAsync.pending, (state, action) => {
                state.mailStatus = 'pending'
                state.mailSent = null
            })
            .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
                state.resetPasswordStatus = 'idle'
                state.resetPassword = action.error.message
            })
            .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
                state.resetPasswordStatus = 'idle'
                state.resetPassword = action.payload.message
            })
            .addCase(resetPasswordRequestAsync.pending, (state, action) => {
                state.resetPasswordStatus = 'pending'
                state.resetPassword = null
            })
    }
}
)

export const { clearUserError } = userSlice.actions

export default userSlice.reducer
