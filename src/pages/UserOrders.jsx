import React, { useEffect } from 'react'


import { useDispatch, useSelector } from 'react-redux'


import { getOrderByUserIdAsync } from '../redux-features/order/orderApi'
import Loading from '../components/common/Loading'

function UserOrders() {
    const allOrders = useSelector(state => state.order.allOrders)
    const orderLoading = useSelector(state => state.order.status)
    const loggedInUser = useSelector(state => state.user.loggedInUser)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getOrderByUserIdAsync({ "userId": loggedInUser.userId }))
    }, [])

    if (orderLoading == "pending") {
        return <Loading></Loading>
    }
    if (allOrders.length == 0) {
        return <div className='flex justify-center items-center h-[80vh]'>
            <h1 className='text-3xl font-bold'>Your Order List is empty</h1>
        </div>
    }
    return (
        <div className="w-[90%] mx-auto">
            <h1 className='text-5xl font-bold mt-3'>My Orders</h1>
            {
                allOrders.map((order, index) => {
                    return <div className="flex mt-6 h-fullrounded p-3 rounded my-4 flex-col border border-gray-200 overflow-y-auto bg-white shadow-xl">
                        <div className='flex flex-col justify-between md:flex-row '>
                            <p className='text-blue-950 font-bold text-2xl'>#{order._id}</p>
                            <p className='text-md  md:self-center'>{new Date(order.createdAt).toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                                dateStyle: "full",
                                timeStyle: "medium"
                            })}</p>
                        </div>
                        <div className='p-3 flex flex-row justify-between'>
                            <h1 className='text-md font-bold'>Order Status: <span className='text-gray-700'> {order.orderStatus}</span></h1>
                            <p className='text-md font-bold'>Payment Method: <span className='text-gray-700'>{order.paymentMethod}</span></p>
                        </div>
                        <div className="flex-1 px-4 py-4 sm:px-6">
                            <div className="mt-4 ">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {order.cartItems.map((product) => (
                                            <li key={product.productId.id} className="flex py-6">
                                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img alt={product.imageAlt} src={product.productId.images[0]} className="size-full object-cover" />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a >{product.productId.title}</a>
                                                            </h3>
                                                            <p className="ml-4">{product.productId.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{product.productId.brand}</p>
                                                    </div>
                                                    {product.color &&
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500">
                                                                Color : {product.color}
                                                            </p>
                                                        </div>
                                                    }
                                                    {product.size &&
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500">
                                                                size : {product.size}
                                                            </p>
                                                        </div>
                                                    }
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500">
                                                            Qty: {product.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>{order.totalAmount}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total Items</p>
                                <p>{order.cartItems.length}</p>
                            </div>
                            {/* <p className="mt-0.5 text-sm text-gray-500">Total items</p> */}
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p className="font-bold text-xl">Selected Address</p>
                            </div>
                            <div className="block text-sm/6 p-2 font-medium text-gray-700">
                                {order.selectedAddress.name}, {order.selectedAddress.email} <br />
                                {order.selectedAddress.street},{order.selectedAddress.city},{order.selectedAddress.region},{order.selectedAddress.country},{order.selectedAddress.postalCode}
                            </div>

                        
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default UserOrders
