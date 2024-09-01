import React, { useEffect, useState } from 'react'
import Sidebar from '../components/profile/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/loader/Loader'
import Login from './Login'
import MobileNav from '../components/profile/MobileNav'

const Profile = () => {
  const [Profile, setProfile] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetchuser = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/user/get-user", { headers });
      // console.log(response.data);
      setProfile(response.data);
    };
    fetchuser();
  }, [])
  return (
    <>

      <div className='bg-blue-200 absolute w-full min-h-screen px-2 md:px-12 flex flex-col md:flex-row py-20 gap-4'>
        {!Profile ? (
          <div className='flex flex-grow items-center justify-center'>
            <Loader />
            {/* <Login/> */}
          </div>
        ) : (
          <>
            <div className='w-full md:w-1/6'>
                <Sidebar data={Profile} />
                <MobileNav/>
            </div>
            <div className='w-full md:w-5/6'>
              <Outlet />
            </div>
          </>
        )}
      </div>

    </>

  )
}

export default Profile