import React from 'react'
import { axiosProductInstance } from '../utils/axios.instance';
import { createContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ProductDataContext = createContext();

const ProductContext = ({ children }) => {

    const createProduct = async (formData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_PRODUCT_BASE}/create`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            return response.data
        } catch (error) {
            console.log(error?.response?.data)
        }
    }
    const getProducts = async () => {
        try {
            const response = await axiosProductInstance.get('/getproduct');
            return (response.data);
        } catch (error) {
            console.log(error.message)
        }
    }
    const getProductsAdmin = async () => {
        try {
            const response = await axiosProductInstance.get('/getadminproduct');
            return (response.data);
        } catch (error) {
            console.log(error.message)
        }
    }
    const singleProduct = async (productId) => {
        try {
            const res = await axiosProductInstance.get(`/singleproduct/${productId}`)
            return (res.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    const editProduct = async (newObj) => {
        try {
            const response = await axiosProductInstance.post("/editproduct", newObj)
            return (response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const deleteProduct = async (productId) => {
        try {
            const response = await axiosProductInstance.post(`/deleteproduct/${productId}`)
            return (response.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>
            <ProductDataContext.Provider value={{ createProduct, getProducts, getProductsAdmin, singleProduct, editProduct, deleteProduct }}>
                {children}
            </ProductDataContext.Provider>
        </>
    )
}

export default ProductContext
