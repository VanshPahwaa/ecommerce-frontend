import { useState } from 'react'

//form
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

// cart
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { useSelector, useDispatch } from 'react-redux'
import { fetchCart, updateInCart } from '../../redux-features/cart/cartApi'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useForm } from "react-hook-form"

import { createOrder } from '../../redux-features/order/orderApi'
import { updateInUser } from '../../redux-features/user/userApi'



export default function Checkout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const user = useSelector(state => state.user.loggedInUser)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()


    useEffect(() => {
        dispatch(fetchCart(user.userId))
    }, [])

    const cartItems = useSelector(state => state.cart.items)

    const subTotal = Math.round(cartItems.reduce((sum, item) => {
        return item.quantity * item.productId.price + sum
    }, 0))

    function handlePaymentMethod(event) {
        setPaymentMethod(event.target.value)
    }

    function handleAddress(value) {
        setSelectedAddress(value)

    }

    function handleOrder(event) {
        if (paymentMethod) {
            if (selectedAddress != null && selectedAddress >= 0) {
                const filteredCart = cartItems.map((item) => {
                    return { productId: item.productId.id, quantity: item.quantity, color: item.color, size: item.size }
                })

                const orderData = { userId: user.userId, totalAmount: subTotal, cartItems: filteredCart, paymentMethod: paymentMethod, selectedAddress: user.addresses[selectedAddress] }
                dispatch(createOrder(orderData))
                navigate('/orderStatus')
            } else {
                alert("select Address")
            }
        } else {
            alert("select payment method")
        }
    }

    function onSubmit(data) {
        //it is for address
        const userData = { ...user, addresses: [...user.addresses, data] }
        console.log(userData)
        dispatch(updateInUser(userData))
        reset()
    }


    return (
        <div className='bg-stone-50 '>
            <div className='w-[80%] mx-auto py-6 flex  flex-col gap-8 md:flex-row '>
                <div className='flex-3  bg-white p-4'>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                {...register("name", { required: "name is required" })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                            {errors.name && <p>{errors.name.message}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                {...register('email', { pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "Enter Valid Email" } })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                        {errors.email && <p>{errors.email.message}</p>}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                            Country
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select
                                                id="country"
                                                name="country"
                                                {...register('country', { required: "select required country" })}
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            >
                                                <option>India</option>
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>

                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                        </div>
                                        {errors.country && <p>{errors.country.message}</p>}

                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="street-address"
                                                name="street-address"
                                                type="text"
                                                autoComplete="street-address"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                {...register('street')}

                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                autoComplete="address-level2"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                {...register('city', { required: "Enter valid city" })}

                                            />
                                        </div>
                                        {errors.city && <p>{errors.city.message}</p>}

                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                                            State / Province
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="region"
                                                name="region"
                                                type="text"
                                                {...register('region', { required: "enter valid State" })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                        {errors.region && <p>{errors.region.message}</p>}

                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                                            ZIP / Postal code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="postal-code"
                                                name="postal-code"
                                                type="text"
                                                {...register('postalCode', { required: "Enter Postal Code" })}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                        {errors.postalCode && <p>{errors.postalCode.message}</p>}

                                    </div>
                                </div>
                            </div>



                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm/6 font-semibold text-gray-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                >
                                    Add Addressess
                                </button>
                            </div>
                        </div>
                    </form>


                    <div className="border-b border-gray-900/10 border-t-2 400 pt-12 pb-12 mt-6">
                        <h2 className="text-base/7 font-semibold text-gray-900">Payment Method</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            Choose one method
                        </p>

                        <div className="mt-2 space-y-10">
                            <fieldset>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            checked={paymentMethod == 'UPI'}
                                            id="UPI"
                                            name="payment-methods"
                                            type="radio"
                                            value={'UPI'}
                                            onClick={handlePaymentMethod}

                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                        />
                                        <label htmlFor="UPI" className="block text-sm/6 font-medium text-gray-900">
                                            UPI
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="cash"
                                            name="payment-methods"
                                            type="radio"
                                            value={'cash'}
                                            // checked={paymentMethod == 'cash'}
                                            defaultChecked={paymentMethod == 'cash'}

                                            onClick={handlePaymentMethod}

                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                        />
                                        <label htmlFor="cash" className="block text-sm/6 font-medium text-gray-900">
                                            Cash On Delivery
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="EMI"
                                            name="payment-methods"
                                            type="radio"
                                            value={'EMI'}
                                            checked={paymentMethod == 'EMI'}
                                            onClick={handlePaymentMethod}
                                            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                        />
                                        <label htmlFor="EMI" className="block text-sm/6 font-medium text-gray-900">
                                            EMI
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>


                    <div className="border-b border-gray-900/10 border-t-2 400 pt-12 pb-12 mt-6">
                        <h2 className="text-base/7 font-semibold text-gray-900">Addresses</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            Choose one Addresses
                        </p>

                        <div className="mt-2 space-y-10">
                            <fieldset>
                                <div className="mt-6 space-y-6">
                                    {user.addresses.length == 0 ? <div>Please Add address</div> : user.addresses.map((address, index) => {

                                        return <div className="flex items-center gap-x-3">
                                            <input
                                                id={index}
                                                name="addresses"
                                                type="radio"
                                                defaultChecked={index == selectedAddress}
                                                onClick={(e) => {
                                                    handleAddress(index)
                                                }
                                                }

                                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                            />
                                            <label htmlFor={index} className="block text-sm/6 font-medium text-gray-900">
                                                {address.name},{address.email} <br />
                                                {address.street},{address.city},{address.region},{address.country},{address.postalCode}
                                            </label>
                                        </div>
                                    })}


                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>


                <div className="w-[80%] mx-auto flex-2 h-fit">
                    <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cartItems.map((product) => (
                                            <li key={product.productId.id} className="flex py-6">
                                                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img alt={product.productId.imageAlt} src={product.productId.images[0]} className="size-full object-cover" />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a >{product.productId.title}</a>
                                                            </h3>
                                                            <p className="ml-4">${product.productId.price}</p>
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
                                                            Qty:{product.quantity}
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
                                <p>${subTotal}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes are included.</p>
                            <div className="mt-6">
                                <button
                                    onClick={handleOrder}

                                    className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                                >
                                    Order Now
                                </button>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{' '}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigate('/', { replace: true })
                                        }}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >

    )
}
