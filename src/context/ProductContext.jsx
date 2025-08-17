import React, { useState } from 'react'
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
    const getProducts = async (page, limit, sort) => {
        try {
            const response = await axiosProductInstance.get(`/getproduct?page=${page}&limit=${limit}&sort=${sort}`);
            return (response.data);
        } catch (error) {
            console.log(error.message)
        }
    }
    const bestSellingProducts = async () => {
        try {
            const response = await axiosProductInstance.get(`/best/products`);
            return (response.data);
        } catch (error) {
            console.log(error.message)
        }
    }
    const getProductsAdmin = async () => {
        try {
            const response = await axiosProductInstance.get('/getadminproduct', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });
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
    const searchProduct = async (search) => {
        try {
            const response = await axiosProductInstance.post(`/search`, { search })
            return (response.data)
        } catch (error) {
            console.error(error.message)
        }
    }
    const categoryProduct = async () => {
        try {
            const response = await axiosProductInstance.get(`/find/category`)
            return (response.data);

        } catch (error) {
            console.error(error)
        }
    }
    const archiveCategory = async (category) => {
        try {
            const response = await axiosProductInstance.post(`/archive/category`, {category})
            return (response.data);
        } catch (error) {
            console.log(error.message);

        }
    }
    const activeCategory = async (category) => {
        try {
            const response = await axiosProductInstance.post(`/active/category`, { category })
            return (response.data);
        } catch (error) {
            console.log(error.message);
        }
    }
     const categoryPublic = async () => {
        try {
            const response = await axiosProductInstance.get(`/find/category/public`)
            return (response.data);
        } catch (error) {
            console.error(error)
        }
    }
    const [lengthc, setlengthc] = useState(0)

    return (
        <>
            <ProductDataContext.Provider value={{ categoryPublic,activeCategory, archiveCategory, categoryProduct, bestSellingProducts, lengthc, setlengthc, searchProduct, createProduct, getProducts, getProductsAdmin, singleProduct, editProduct, deleteProduct }}>
                {children}
            </ProductDataContext.Provider>
        </>
    )
}

export default ProductContext
