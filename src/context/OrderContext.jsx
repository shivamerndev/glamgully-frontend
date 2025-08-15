import React from 'react'
import { createContext } from 'react'
import axios from 'axios'

export const OrderDataContext = createContext()
const OrderContext = ({ children }) => {

    const createOrder = async (data) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/order/create`, data)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const readOrder = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/order/read`)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const sendNotification = async (data) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/send-notification`, data)
          return (res.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <OrderDataContext.Provider value={{ createOrder, readOrder, sendNotification}}>
            {children}
        </OrderDataContext.Provider>
    )
}

export default OrderContext
