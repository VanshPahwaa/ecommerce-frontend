import { createAsyncThunk } from "@reduxjs/toolkit"

import { signUpUser,logInUser,updateUser,isUserLoggedIn, logoutUser,forgetPasswordRequest,resetPasswordRequest } from "../../services/user"

export const registerUser = createAsyncThunk('user/registerUser',
    async ( userData ) => {
        const response = await signUpUser(userData)
        return response
    });


export const checkUser = createAsyncThunk('user/checkUser',
    async ( userData ) => {
        const response = await logInUser(userData)
        return response
    });

export const updateInUser = createAsyncThunk('user/updateInUser',
    async (userData) => {
        const response = await updateUser(userData)
        return response
    });

export const isLoggedIn=createAsyncThunk('user/isLoggedIn',
    async () => {
        const response = await isUserLoggedIn()
        return response
    });


export const signOutUser=createAsyncThunk('user/signOutUser',
    async () => {
        const response = await logoutUser()
        return response
    });

export const forgetPasswordRequestAsync =createAsyncThunk('user/forgetPasswordRequestAsync',
    async (email) => {
        const response = await forgetPasswordRequest(email)
        return response
    });

    
export const resetPasswordRequestAsync =createAsyncThunk('user/resetPasswordRequestAsync',
    async ({email,token,password}) => {
        const response = await resetPasswordRequest({email,token,password})
        return response
    });