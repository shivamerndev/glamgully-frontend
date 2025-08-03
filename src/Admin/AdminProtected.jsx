import React, { useContext, useEffect } from 'react'
import { href, useNavigate } from 'react-router-dom'
import { AdminDataContext } from '../context/AdminContext'

const AdminProtected = ({ children }) => {
    const navigate = useNavigate()
    const { GetAdminDashboard } = useContext(AdminDataContext)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate('/admin/login')
        }
        // else {
        //     GetAdminDashboard()
        // }
    }, [])
    return <> {children} </>
}

export default AdminProtected
