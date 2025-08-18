import { myAxios } from "./helper"



export const postCart = async (cartData) => {
    try {
        const response = await myAxios.post(
            '/cart/',
            cartData,
        )
        return response.data.data
    } catch (error) {
        console.log(error.message)
        throw new Error(error)
    }
}

export const getCart = async (userId) => {
    try {
        const response = await myAxios.get(`/cart/` + userId,
        )
        return response.data.data
    } catch (error) {
        throw new Error(error)
    }
}

export const updateCart = async (updatedCart) => {
    try {
        const { data } = await myAxios.patch(`/cart/` + updatedCart.id, updatedCart)
        return data.data
    } catch (error) {
        console.log(error.message)
        throw new Error(error)
    }
}

export const deleteCart = async (userId) => {
    try {
        const cartItems = await getCart(userId.id)
        let data = null
        for (let item of cartItems) {
            data = await myAxios.delete(`/cart/` + item.id )
        }
        return data.data

    } catch (error) {
        console.log(error.message)
        throw new Error(error)
    }
}

export const deleteCartByProductId = async (productId) => {
    try {
        const { data } = await myAxios.delete(`/cart/` + productId)
        return data.data

    } catch (error) {
        console.log(error.message)
        throw new Error(error)
    }
}
