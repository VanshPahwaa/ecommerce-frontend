
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { Navigate } from "react-router"

import { resetOrderStatus } from "../redux-features/order/orderSlice"

export default function OrderSuccess() {

    const dispatch = useDispatch()
    const order = useSelector(state => state.order.order)
    const orderProcessing = useSelector(state => state.order.orderProcessing)

    useEffect(() => {
        return () => {
            dispatch(resetOrderStatus())
        }
    }, [])
    console.log(order)
    if (!orderProcessing) {
        return <>
            <Navigate to='/'></Navigate>
        </>
    }

    if (orderProcessing == "Processing") {
        return <div>Processing</div>
    }
    return (
        <>
            
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">{order._id}</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                        Order {orderProcessing}
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                       Thank you for shopping, we hope you will enjoy aur products
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Go back home
                        </a>
                        <a href="#" className="text-sm font-semibold text-gray-900">
                            Contact Admin <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
            </main>
        </>
    )
}
