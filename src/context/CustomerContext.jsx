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
            alert(error?.response?.data);
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
    const createReviewImg = async (file) => {
        try {
            const formData = new FormData();
            formData.append("reviewimg", file); // backend me req.file naam ka milega

            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/img/review/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
            );
            return ( res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const readReviewsImg = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/img/review/read`);
            return ( res.data);
        } catch (error) {
            console.log(error.message);

        }
    }
    return (
        <>
            <CustomerDataContext.Provider value={{readReviewsImg, createReviewImg, createCustomer, allCustomers }}>
                {children}
            </CustomerDataContext.Provider>

        </>
    )
}

export default CustomerContext
