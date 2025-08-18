
import { useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"

import { StarIcon } from '@heroicons/react/20/solid'


import { addToCart,fetchCart } from '../../redux-features/cart/cartApi'
import Loading from '../common/Loading'

const reviews = { href: '#', average: 4, totalCount: 117 }



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()


  const loggedInUser = useSelector(state => state.user.loggedInUser)
  let product = useSelector(state => state.product.selectedProduct)
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const addToCartError = useSelector(state => state.cart.error)


  function handleAddToCartLoading(value) {
    setAddToCartLoading(value)
  }
  function handleCart(data) {
    try {
      
        setAddToCartLoading(true)
        const cartData = { productId: product.id, quantity: 1,color:data.color,size:data.size, userId: loggedInUser.userId }
       
        dispatch(addToCart(cartData))
        setTimeout(() => {

          if (addToCartError) {
            throw new Error(addToCartError)
          } else {
            handleAddToCartLoading(false)
            dispatch(fetchCart(loggedInUser.userId))
          }
        }, 1000)
    } catch (error) {
      alert(error.message)
      setAddToCartLoading(false)
    }
  }


  if (!product) {
    return <Loading></Loading>
  }

  return (

    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.tags.map((name, idx) => (
              <li key={idx}>
                <div className="flex items-center">
                  <a href={'/'} className="mr-2 text-sm font-medium text-gray-900">
                    {name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={'/'} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">

          <img
            alt={product.images[0].alt}
            src={product.images[0]}
            className="row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'size-5 shrink-0',
                      )}
                    />
                  ))}
                </div>
                <p className=" ml-3 text-sm font-medium text-indigo-600"> out of 5 stars</p>

              </div>
            </div>

            <form className="mt-10" noValidate onSubmit={handleSubmit(handleCart)}>
              {/* Colors */}
              {product.color && product.color.length > 0 &&
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <fieldset aria-label="Choose a color" className="mt-4">
                    <div className="flex items-center gap-x-3">
                      {product.color.map((color, index) => (
                        <div key={index} className="flex rounded-full outline -outline-offset-1 outline-black/10">
                          <input
                            {...register("color", { required: "Select Color" })}
                            value={color}
                            // defaultChecked={color === product.colors[0]}
                            name="color"
                            type="radio"
                            aria-label={color}

                            className={`size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3`}
                            style={{ background: `${color}` }}
                          />
                        </div>
                      ))}
                    </div>
                  </fieldset>
                  {errors.color && <span className='text-red-500'>{errors.color.message}</span>}
                </div>}

              {/* Sizes */}
              {product.size && product.size.length > 0 &&
                <div className="mt-10">

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <div className="grid grid-cols-4 gap-3">
                      {product.size.map((size) => (
                        <label
                          key={size.id}
                          aria-label={size.name}
                          className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                        >
                          <input
                            // defaultValue={size}
                            value={size}

                            name="size"
                            type="radio"
                            {...register("size", { required: "select required size" })}

                            className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                          />
                          <span className="text-sm font-medium uppercase group-has-checked:text-white">{size}</span>
                        </label>
                      ))}
                    </div>
                    {errors.size && <span className='text-red-500'>{errors.size.message}</span>}

                  </fieldset>
                </div>}

              {addToCartLoading ?
                <button
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600  opacity-80 px-8 py-3 text-base font-medium text-white">
                  Adding To Cart
                </button> :
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700  focus:outline-hidden">
                  Add to bag
                </button>}
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 ">
                <p className="text-sm text-gray-600">brand: {product.brand}</p>
                <p className="text-sm text-gray-600">weight: {product.weight}</p>
                <p className="text-sm text-gray-600">warranty: {product.warrantyInformation}</p>
                <p className="text-sm text-gray-600">Return Policy: {product.returnPolicy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
