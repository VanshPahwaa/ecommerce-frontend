import axios from "axios"
import { myAxios } from "./helper"

export const getAllProducts = async () => {
    try {
        const response = await myAxios.get("/products")
        return response.data
    } catch (error) {
        throw new Error(error)
    }

}


export const getFilteredProducts = async (filter, sort, page) => {
    try {
        let queryString = ""

        for (let key in filter) {
            const categoryValues = filter[key];
            for (let i = 0; i < filter[key].length; i += 1) {
                queryString += `${key}=${categoryValues[i]}&`;
            }
        }

        if (sort.value) {
            if (sort.order == "desc") {
                queryString += `_sort=${sort.value}&ord=desc&`
            } else {
                queryString += `_sort=${sort.value}&ord=asc&`
            }
        }

        if (page) {
            queryString += `_page=${page.currentPage}&`
            queryString += `_per_page=${page.perPage}`
        }

        const response = await myAxios.get(`/products?${queryString}`)
        return { products: response.data.data, totalProducts: response.data.totalProducts }
    } catch (error) {
        throw new Error(error)
    }
}

export const getProductById = async (id) => {
    try {
        const { data } = await myAxios.get(`/products/${id}`)
        return data.data
    } catch (error) {
        throw new Error(error)
    }
}

