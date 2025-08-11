import React, { useContext, useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { CustomerDataContext } from '../context/CustomerContext'

const CustomersPage = () => {
    const { allCustomers } = useContext(CustomerDataContext)
    const [customer, setCustomer] = useState([])


    useEffect(() => {
        allCustomers().then(res => {
            setCustomer(res)
        }).catch(err => {
            console.log(err);
            setCustomer([])
        })
    }, [])

    return (
        <div>
            <AdminNavbar focus={'Customers'} />
            <div className="flex flex-col pt-30 px-4  lg:flex-row h-screen bg-gray-100">
                {customer.length > 1 ? <section >
                    <h2 className="text-xl md:text-2xl font-semibold mb-5">Customer Management</h2>
                    <div className="overflow-x-auto bg-white shadow rounded-xl">
                        <table className="min-w-full text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customer?.map((c, i) => <tr key={i}>
                                    <td className="px-4 py-2">{c.fullname}</td>
                                    <td className="px-4 py-2">{c.phone}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </section>
                    : <h1 className='w-full text-xl text-center py-4 text-red-500 font-semibold'>No Customers </h1>}
            </div>
        </div>
    )
}

export default CustomersPage
