import { createSlice } from "@reduxjs/toolkit";

import { fetchOrder, createOrder,getOrderByUserIdAsync } from "./orderApi";

const initialState = {
    order: [],
    status: "idle",
    orderProcessing:null,
    errors:null,
    allOrders:[]
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrderStatus:(state)=>{
            state.orderProcessing=null,
            state.order=null
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.status = 'idle'
            state.order = action.payload
        })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.status = 'idle'
                state.errors = action.error.message

            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'idle'
                state.orderProcessing="Successful"
                state.order=action.payload
                state.errors = null

            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'idle',
                state.orderProcessing="Failed"
                state.errors = action.error.message
            })
            .addCase(createOrder.pending, (state, action) => {
                state.status = 'pending'
                state.orderProcessing="Processing"

            })
             .addCase(getOrderByUserIdAsync.rejected, (state, action) => {
                state.status = 'idle',
                state.errors=action.error.message
            })
            .addCase(getOrderByUserIdAsync.pending, (state, action) => {
                state.status = 'pending'
                state.errors=null

            })
             .addCase(getOrderByUserIdAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.allOrders=action.payload

            })
            

    }
}
)

export const { resetOrderStatus} = orderSlice.actions

export default orderSlice.reducer
