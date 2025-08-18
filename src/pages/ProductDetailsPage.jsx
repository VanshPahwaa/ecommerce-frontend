import React from 'react'

import ProductDetails from '../components/products/ProductDetails'
import {useParams} from "react-router"
import {useDispatch} from "react-redux"
import { fetchProductById } from '../redux-features/products/productApi'

function ProductDetailsPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const productId={id:id}
  
  dispatch(fetchProductById(productId))

  return (
    <>
      <ProductDetails />
    </>
  )
}

export default ProductDetailsPage
