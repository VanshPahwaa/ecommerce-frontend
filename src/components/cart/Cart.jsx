import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'


import { Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { deleteInCartByProductId, fetchCart, updateInCart } from '../../redux-features/cart/cartApi'
import Loading from '../common/Loading'


export default function Cart() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchStatus = useSelector((state) => state.cart.fetchStatus)
    const cartError = useSelector((state) => state.cart.error)

    const [open, setOpen] = useState(true)
    const user = useSelector(state => state.user.loggedInUser)

    useEffect(() => {
        dispatch(fetchCart(user.userId))
    }, [user, dispatch])

    const cartItems = useSelector(state => state.cart.items)

    const subTotal = Math.round(cartItems.reduce((sum, item) => {
        return item.quantity * item.productId.price + sum
    }, 0))

    function handleUpdate(event, item) {
        const updatedCart = { ...item, productId: item.productId.id, quantity: parseInt(event.target.value) }
        dispatch(updateInCart(updatedCart))
    }

    function handleDelete(id) {
        dispatch(deleteInCartByProductId(id))
    }

    if (fetchStatus == "loading") {
        return <Loading></Loading>
    }
    if (cartError) {
        return <div>{cartError}</div>
    }
    if (cartItems.length < 1) {
        return <div className='flex items-center h-[100vh] justify-center'><h1 className='text-center text-5xl font-semibold'>Please Fill your Cart</h1></div>
    }
    return (

        <div className="w-[80%] mx-auto m-3 mb-6 ">
            <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="mt-8">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {cartItems.map((product) => (
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
                                                    Qty:
                                                    <select value={product.quantity} onChange={(e) => {
                                                        handleUpdate(e, product)
                                                    }}>
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                        <option value={4}>4</option>

                                                    </select>
                                                </p>

                                                <div className="flex">
                                                    <button type="button" onClick={(e) => {
                                                        handleDelete(product.id)
                                                    }} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                        Remove
                                                    </button>
                                                </div>
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
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or{' '}
                            <button
                                type='button'
                                onClick={() => {
                                    navigate('/')
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
    )
}
