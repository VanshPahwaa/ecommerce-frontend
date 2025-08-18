import { createAsyncThunk } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";

import { getOrder, postOrder,getOrderByUserId } from "./order.js";
import { resetCart } from "../cart/cartSlice.jsx";
import { useStore } from "react-redux";
import { deleteInCart } from "../cart/cartApi.jsx";


export const createOrder = createAsyncThunk('order/createOrder',
    async (orderData, { dispatch, getState }) => {
        const response = await postOrder(orderData)
        const globalState = getState()
        const userId = { id: globalState.user.loggedInUser.userId }
        dispatch(deleteInCart(userId))
        return response
});


export const fetchOrder = createAsyncThunk('order/fetchOrder',
    async (userId) => {
        const response = await getOrder(userId)
        return response
    });

export const getOrderByUserIdAsync = createAsyncThunk('order/getOrderByUserIdAsync',
    async ({userId,sort,order}) => {
        const response = await getOrderByUserId(userId,sort,order)
        return response
    });