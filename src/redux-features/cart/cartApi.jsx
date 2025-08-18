import { createAsyncThunk } from "@reduxjs/toolkit"

import { deleteCart, postCart, updateCart,getCart,deleteCartByProductId } from "../../services/cart.js";


export const fetchCart = createAsyncThunk('cart/fetchCart',
    async (userId) => {
        const response = await getCart(userId)
        return response
    });


export const addToCart = createAsyncThunk('cart/addToCart',
    async (cartData) => {
        const response = await postCart(cartData)
        return response
    });

export const updateInCart = createAsyncThunk('cart/updateInCart',
    async (updatedCart) => {
        const response = await updateCart(updatedCart)
        return response
    });

export const deleteInCart = createAsyncThunk('cart/deleteInCart',
    async (userId) => {
        const response = await deleteCart(userId)
        return response
    });



export const deleteInCartByProductId = createAsyncThunk('cart/deleteInCartByProductId',
    async (productId) => {
        const response = await deleteCartByProductId(productId)
        return response
    });