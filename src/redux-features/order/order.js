import axios from "axios"
import { myAxios } from "../../services/helper"

export const postOrder = async (orderData) => {
    try {
        const { data } = await myAxios.post("/order/", orderData)
        return data.data
    } catch (error) {
        throw new Error(error.message)
    }
}


export const getOrder = async (userId) => {
    try {
        let queryString = ""
        for (let value of userId) {
            queryString += `user.id=${value}&`
        }
        const { data } = await myAxios.get("/order?" + queryString)
        return data
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}


export const getOrderByUserId = async (userId, sort, order) => {
    try {


        let queryString = ""
        if (userId) {
            queryString += `userId=${userId}&`
        }
        if (sort && order) {
            queryString += `sort=${sort}&order=${order}`
        }

        const { data } = await myAxios.get("/order/filtered-orders?" + queryString)
        return data.data
    } catch (error) {
        throw new Error(error.message)
    }
}
