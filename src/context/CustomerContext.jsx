import axios from 'axios';
import React from 'react'
import { createContext } from 'react'

// This context is currently empty, but can be used to manage customer-related state in the future.
export const CustomerDataContext = createContext();

const CustomerContext = ({ children }) => {

    const createCustomer = async (data) => {
        try {
            let res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/create`, data)
            return res.data;
        } catch (error) {
            console.log(error);

        }
    }
    const allCustomers = async () => {
        try {
            let res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/all`)
            return (res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <CustomerDataContext.Provider value={{ createCustomer, allCustomers }}>
                {children}
            </CustomerDataContext.Provider>

        </>
    )
}

export default CustomerContext
