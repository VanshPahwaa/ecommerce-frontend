import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"

function UserProfile() {
    const loggedInUser = useSelector(state => state.user.loggedInUser)

    return (
        <div className='w-[90%] mx-auto my-4 py-4'>
            <div>
                <span className='font-bold text-5xl'>Profile</span>
                <div className='flex flex-col mt-6 font-semibold text-xl gap-0.5'>
                    <span className='font-bold mt-4'>Username</span>

                    <span className='text-gray-700 text-md border-b-2'>{loggedInUser.userName.charAt(0).toUpperCase() + loggedInUser.userName.slice(1)}</span>
                     <span className='font-bold mt-4'>Email</span>
                    <span className='text-gray-700 text-md border-b-2'> {loggedInUser.email}</span>
                    {/* <span className='font-semibold text-2xl'>{loggedInUser.userId}</span> */}
                    <span className='font-bold mt-4'> Addresses</span>

                    {loggedInUser.addresses.map((address, index) => {

                        return <div className=" border-gray-200 py-2 sm:px-6">
                            <div className="block text-sm/6  font-medium text-gray-700">
                                {address.name}, {address.email} <br />
                                {address.street},{address.city},{address.region},{address.country},{address.postalCode}
                            </div>

                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserProfile
