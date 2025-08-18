import { createSlice } from "@reduxjs/toolkit"

import { fetchAllProducts, fetchByFilter, fetchProductById } from "./productApi"

const initialState = {
    products: [],
    error: null,
    state: "loading",
    selectedProduct: null,
    totalProducts:null
}

export const productSlice = createSlice({

    name: "product",
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        }

    },

    extraReducers: builder => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.products = [...action.payload]
            state.status = 'idle'
            state.error = null

        })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.status = "idle"
                state.error = action.error.message
            })
            .addCase(fetchAllProducts.pending, state => {
                state.status = "loading"
            })

            .addCase(fetchByFilter.fulfilled, (state, action) => {
                state.status = "idle"
                state.error = null
                state.products = [...action.payload.products]
                state.totalProducts=action.payload.totalProducts

            }).addCase(fetchByFilter.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchByFilter.rejected, (state, action) => {
                state.status = "idle"
                state.error = action.error.message
            })

            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = "idle"
                state.selectedProduct = action.payload
                state.error = null
            }).addCase(fetchProductById.rejected, (state, action) => {
                state.status = "idle"
                state.error = action.error.message
            })
            .addCase(fetchProductById.pending, (state, action) => {
                state.status = "loading"

            })
    }
}
)

export const { increment } = productSlice.actions

export default productSlice.reducer