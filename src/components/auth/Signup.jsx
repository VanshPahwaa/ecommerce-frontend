import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form"


import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";

import { registerUser } from "../../redux-features/user/userApi";
import { clearUserError } from "../../redux-features/user/userSlice";
import Loading from "../common/Loading";

export default function Signup() {

    const loggedInError = useSelector(state => state.user.error)
    const loading = useSelector(state => state.user.status)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user.loggedInUser)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        try {
            dispatch(registerUser({ "userName": data.userName, "email": data.email, "password": data.password, "addresses": [] }))
        } catch (error) {
            alert(error.message)
        }
    }



    if (loading == "pending") {
        return <Loading></Loading>
    }
    if (loggedInError) {
        alert(loggedInError)
        dispatch(clearUserError)
    }
    return (
        <>
            {user && <Navigate to={'/'}></Navigate>}

            <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="/newLogo.png"
                        className="mx-auto h-25 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-darkG">
                        Sign Up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="userName" className="block text-sm/6 font-medium text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    {...register('userName', { required: true })}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            {errors.userName && <p className="text-red-400"> Enter Name</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
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
                        </div>

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
                                            return condition || "password not mactched"
                                        }

                                        // data==getValues.password? ()=>{}:setError({type:'validate',message:"password not matched"})
                                    })}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            {errors.confirmedPassword && errors.confirmedPassword.message}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-lightO px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already member?{' '}
                        <Link to={"/login"} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            LogIn
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
