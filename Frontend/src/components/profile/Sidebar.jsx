import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className='bg-blue-400 rounded-lg p-6 flex flex-col items-center justify-between shadow-md h-[100%]'>
      <div className='flex flex-col items-center justify-center'>
        <img src={data.avatar} className='rounded-full h-[15vh] w-[15vh] object-cover' alt='User Avatar' />
        <p className='mt-4 font-semibold text-xl text-white'>{data.username}</p>
        <p className='mt-2 font-medium text-white'>{data.email}</p>
        <div className='bg-blue-800 h-[1px] w-full mt-4 '></div>
      </div>

      {role === 'user' &&
        <div className='flex flex-col items-center justify-center'>
          <Link className='font-semibold w-full py-2 mt-2 text-white text-center hover:text-xl transition-all duration-300' to="/profile/orderhistory">Order History</Link>
          <Link className='font-semibold w-full py-2 mt-2 text-white text-center hover:text-xl transition-all duration-300' to="/profile">Favourites</Link>
          <Link className='font-semibold w-full py-2 mt-2 text-white text-center hover:text-xl transition-all duration-300' to="/profile/settings">Settings</Link>
        </div>
      }

      {role === 'admin' &&
        <div className='flex flex-col items-center justify-center'>
          <Link className='font-semibold w-full py-2 mt-2 text-white text-center hover:text-xl transition-all duration-300' to="/profile/all-orders">All Orders</Link>
          <Link className='font-semibold w-full py-2 mt-2  text-white text-center hover:text-xl transition-all duration-300' to="/profile/add-book">Add Book</Link>
        </div>
      }

      <div>
        <button className='flex items-center justify-center w-full font-semibold px-4 bg-blue-600 text-white p-2 rounded-xl mt-3 hover:text-xl transition-all duration-300 hover:bg-blue-800'
          onClick={() => {
            dispatch(authActions.logout());
            dispatch(authActions.changeRole("user"));
            localStorage.clear("id");
            localStorage.clear("token");
            localStorage.clear("role");
            history("/")
          }}
        >
          Log Out <FiLogOut className='ms-4' />
        </button>
      </div>
    </div>
  )
}

export default Sidebar