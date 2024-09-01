import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);
    return (
        <>
            {role === 'user' &&
                <div className='w-full flex lg:hidden items-center justify-center mt-5'>
                    <Link className='font-bold w-full  text-blue-800 text-center hover:text-xl transition-all duration-300' to="/profile/orderhistory">Order History</Link>
                    <Link className='font-bold w-full  text-blue-800 text-center hover:text-xl transition-all duration-300' to="/profile">Favourites</Link>
                    <Link className='font-bold w-full  text-blue-800 text-center hover:text-xl transition-all duration-300' to="/profile/settings">Settings</Link>
                </div>
            }
            {role === 'admin' &&
                <div className='w-full flex lg:hidden items-center justify-center mt-5'>
                    <Link className='font-bold w-full  text-blue-800 text-center hover:text-xl transition-all duration-300' to="/profile/all-orders">All Orders</Link>
                    <Link className='font-bold w-full  text-blue-800 text-center hover:text-xl transition-all duration-300' to="/profile/add-book">Add Book</Link>
                </div>
            }
        </>
    )
}

export default MobileNav