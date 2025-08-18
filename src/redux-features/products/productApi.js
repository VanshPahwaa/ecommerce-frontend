import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllProducts, getFilteredProducts, getProductById } from "../../services/products";

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts',
    async () => {
        const response = await getAllProducts()
        return response
    })

export const fetchByFilter = createAsyncThunk('products/fetchByFilter',
    async ({ filter, sort, page }) => {// asyncthunk accept only single object, we have to accept parameters in single object if there are more than one 

        const response = await getFilteredProducts(filter, sort, page)
        return response
    }
)
export const fetchProductById = createAsyncThunk('products/fetchProductById',
    async (productId) => {
        const response = await getProductById(productId.id)
        return response
    }
)
