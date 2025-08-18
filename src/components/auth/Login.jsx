import { Link, Navigate } from "react-router";

import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import Loading from "../common/Loading";
import { checkUser } from "../../redux-features/user/userApi";
import { clearUserError } from "../../redux-features/user/userSlice";
import { useNavigate } from "react-router";

export default function Login() {
    const user = useSelector(state => state.user.loggedInUser)
    const loggedInError=useSelector(state=>state.user.error)
    const loading=useSelector(state=>state.user.status)
    const navigate=useNavigate()
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        dispatch(checkUser({ "email": data.email, "password": data.password }))
    }

    if(loading=="pending"){
        return <Loading></Loading>
    }
    if(user){
         navigate("/",{replace:true})
    }
    if(loggedInError){
        alert(loggedInError)
        dispatch(clearUserError())
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
                    <h2 className="mt-10 text-center text-2xl/9 text-darkG font-bold tracking-tight ">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                <div className="text-sm">
                                    <Link to="/forget-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    {...register('password', { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/ })}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            {errors.password && <p> Enter Valid Password</p>}

                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-lightO px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <Link to={'/signup'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Create a new Account
                        </Link >
                    </p>
                </div>
            </div>
        </>
    )
}
