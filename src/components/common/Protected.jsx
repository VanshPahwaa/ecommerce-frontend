import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'


import Navbar from '../navbar/Navbar'
import Footer from '../navbar/Footer'
import Loading from './Loading'

function Protected({ children }) {
    const user = useSelector(state => state.user.loggedInUser)
    const userLoading = useSelector(state => state.user.status)

    if (userLoading == "pending") {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to={'/login'}></Navigate>
    }
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )

}

export default Protected
