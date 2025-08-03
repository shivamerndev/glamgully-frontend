
import React from 'react'
import { createContext } from 'react'
import { axiosAdminInstance } from '../utils/axios.instance'

export const AdminDataContext = createContext()

const AdminContext = ({ children }) => {

    const createAdmin = async (data) => {
        try {
            const response = await axiosAdminInstance.post("/register", data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    const LoginAdmin = async (data) => {
        try {
            const response = await axiosAdminInstance.post("/login", data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    const GetAdminDashboard = async () => {
        try {
            const res = await axiosAdminInstance.get('/dashboard')
            return (res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const LogoutAdmin = () => {
        try {
            localStorage.removeItem('token')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <AdminDataContext.Provider value={{ createAdmin, LoginAdmin, GetAdminDashboard, LogoutAdmin }}>
                {children}
            </AdminDataContext.Provider>
        </>
    )
}

export default AdminContext
