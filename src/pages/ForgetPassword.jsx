import React from 'react'


import { useDispatch, useSelector } from "react-redux"
import { useForm } from 'react-hook-form'
import { forgetPasswordRequestAsync } from '../redux-features/user/userApi'
import { Link } from 'react-router'


function ForgetPassword() {

    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const mailSent=useSelector(state=>state.user.mailSent)
    const mailStatus=useSelector(state=>state.user.mailStatus)

    function onSubmit(data) {
        dispatch(forgetPasswordRequestAsync(data.email))
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                        alt="Your Company"
                        src="/newLogo.png"
                        className="mx-auto h-25 w-auto"
                    />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Forget Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Enter your email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"

                                {...register('email', { required: true, pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ })}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.email && <p className="text-red-400"> Enter valid email</p>}
                        {mailSent && <p className='text-red'>{mailSent}</p>}
                    </div>
                    <div>
                        {mailStatus=="pending" ?<button
                            disabled
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs opacity-75">
                            Processing
                        </button>:
                        <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Send reset link
                        </button>
                            }
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    You remember password?{' '}
                    <Link to={'/login'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Go back to login
                    </Link >
                </p>
            </div>
        </div>
    )
}

export default ForgetPassword
