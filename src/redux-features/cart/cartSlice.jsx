import { createSlice } from "@reduxjs/toolkit";

import { updateInCart, fetchCart, deleteInCart, addToCart, deleteInCartByProductId } from "./cartApi";


const initialState = {
    items: [],
    fetchStatus: "idle",
    operationStatus: "idle",
    error: null

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // resetCart:(state)=>{
        //     state.items=[]
        // }

    },
    extraReducers: builder => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.fetchStatus = 'idle'
            state.items = action.payload
            state.error = null

        })
            .addCase(fetchCart.rejected, (state, action) => {
                state.fetchStatus = 'idle'
                state.error = action.error.message
            })
            .addCase(fetchCart.pending, (state, action) => {
                state.fetchStatus = 'loading'
                state.error=null
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                state.operationStatus = 'idle'
                state.items.push(action.payload)
                state.error = null
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.operationStatus = 'idle'
                state.error = action.error.message
            })
            .addCase(addToCart.pending, (state, action) => {
                state.operationStatus = 'loading'
            })


            .addCase(updateInCart.fulfilled, (state, action) => {
                state.fetchStatus = 'idle'
                const index = state.items.findIndex(item => item.id == action.payload.id)
                state.items[index] = action.payload
                state.error = null
            })
            .addCase(updateInCart.rejected, (state, action) => {
                state.fetchStatus = 'idle'
                state.error = action.payload.message
            })

            .addCase(deleteInCart.fulfilled, (state, action) => {// it is on the basis of userid
                state.status = 'idle'
                state.items = []
                state.error = null
            })
            .addCase(deleteInCart.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload.message
            })
            .addCase(deleteInCartByProductId.fulfilled, (state, action) => {
                state.fetchStatus = 'idle'
                const index = state.items.findIndex(item => item.id == action.payload.id)
                state.items.splice(index,1)
                state.error = null
            })
            .addCase(deleteInCartByProductId.rejected, (state, action) => {
                state.fetchStatus = 'idle'
                state.error = action.error.message
            })
            .addCase(deleteInCartByProductId.pending, (state, action) => {
                state.fetchStatus = 'pending'
            })
    }
}
)

export const { resetCart } = cartSlice.actions

export default cartSlice.reducer
