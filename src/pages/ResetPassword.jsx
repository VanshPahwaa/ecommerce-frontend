import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { resetPasswordRequestAsync } from '../redux-features/user/userApi'

function ResetPassword() {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token');
    const email = params.get('email');
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const resetPasswordStatus = useSelector(state => state.user.resetPasswordStatus)
    const resetPassword = useSelector(state => state.user.resetPassword)


    async function onSubmit(data) {
        dispatch(resetPasswordRequestAsync({ email: email, token: token, password: data.password }))
    }


    return (
        <>

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="/newLogo.png"
                        className="mx-auto h-25 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Reset Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">


                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"

                                    // {...register('password', {required:true, pattern: ^ (?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$ })}
                                    {...register('password', { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/ })}

                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            {errors.password && <p> Enter Valid Password</p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmedPassword" className="block text-sm/6 font-medium text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmedPassword"
                                    name="confirmedPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    {...register('confirmedPassword', {
                                        validate: (data, globalData) => {
                                            const condition = data == globalData.password
                                            return condition || "password not matched"
                                        }
                                    })}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            {errors.confirmedPassword && errors.confirmedPassword.message}
                        </div>

                        {resetPassword && <p className='text-red-500'>{resetPassword}</p>}

                        <div>
                            {resetPasswordStatus != "pending" ?
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Reset password
                                </button> : <button
                                    disabled
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Processing
                                </button>
                            }

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
