import axios from "axios"
import { myAxios } from "./helper"


export function signUpUser(userData) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await myAxios.post('/auth/signup', userData)
            if(response.data.success){
                window.location.href='/login'
            }
            resolve(response.data)

        } catch (error) {
            console.log("error")
            reject(error.message)
        }
    })
}

export function logInUser(userData) {
    return new Promise(async (resolve, reject) => {
        try {
            
            const { email, password } = userData;
            const { data } = await myAxios.post('/auth/login', { email: email, password: password })
            
            resolve(data.data)
        } catch (error) {
            reject(error.message)
        }
    })
}


export function updateUser(userData) {
    return new Promise(async (resolve, reject) => {
        try {
          
            const response = await myAxios.put('/user/' + userData.userId, userData)
            const newData = { ...response.data.data, userId: response.data.userId }
            resolve(newData)

        } catch (error) {
            reject(error.message)
        }
    })
}

export function isUserLoggedIn() {
    return new Promise(async (resolve, reject) => {
        try {
            
            const { data } = await myAxios.get('/auth/me')
            resolve(data.data)
        } catch (error) {
            reject(error.message)
        }
    })
}

export function logoutUser() {
    return new Promise(async (resolve, reject) => {
        try {
            
            const { data } = await myAxios.post('/auth/logout')
            resolve(data.data)
        } catch (error) {
            reject(error.message)
        }
    })
}

export function forgetPasswordRequest(email) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await myAxios.post("/auth/forget-password-request", { email: email })
            resolve(response.data)

        } catch (error) {
            reject(error)
        }
    })
}

export function resetPasswordRequest({ email, password, token }) {
    return new Promise(async (resolve, reject) => {
        try {
            
            const response = await myAxios.patch("/auth/reset-password", {email:email,password:password,resetPasswordToken:token})
            resolve(response.data)
        } catch (error) {
            reject(error)
        }
    })
}
