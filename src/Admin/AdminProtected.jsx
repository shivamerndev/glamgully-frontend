import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminDataContext } from '../context/AdminContext'

const AdminProtected = ({ children }) => {
    const navigate = useNavigate()
    const { GetAdmin } = useContext(AdminDataContext)
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (!token) return navigate('/admin/login')
        GetAdmin()
    }, [token])
    return <> {children} </>
}

export default AdminProtected
