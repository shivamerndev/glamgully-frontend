import React from 'react'
import { createContext } from 'react'
import axios from 'axios'

export const OrderDataContext = createContext()
const OrderContext = ({ children }) => {

    const sendNotification = async (data) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/send-notification`, data)
            return (res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <OrderDataContext.Provider value={{ sendNotification }}>
            {children}
        </OrderDataContext.Provider>
    )
}

export default OrderContext
