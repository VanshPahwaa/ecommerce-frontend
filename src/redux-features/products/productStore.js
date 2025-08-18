import {configureStore} from '@reduxjs/toolkit'
import ProductsReducer from './productSlice'
import UserReducer from "../user/userSlice"
import CartReducer from "../cart/cartSlice"
import OrderReducer from '../order/orderSlice'


export const store= configureStore({
    reducer:{
        product:ProductsReducer,
        user:UserReducer,
        cart:CartReducer,
        order:OrderReducer
    }
}
)