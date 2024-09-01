import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../loader/Loader';

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/get-user', { headers });
        setProfile(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetch();
  }, []);

  const handleAddressChange = (e) => {
    setValue({ address: e.target.value });
  };
  const updateAddress = async () => {
    const response=await axios.put('http://localhost:3000/api/v1/user/update-address',value,{headers})
    alert(response.data.message);
  }
  return (
    <>
      {!profile ? (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>

          <div className="flex gap-12 mb-8">
            <div>
              <label htmlFor="username" className='font-semibold text-black'>Username</label>
              <p className="p-2 rounded bg-blue-800 mt-2 font-semibold">
                {profile.username}
              </p>
            </div>

            <div>
              <label htmlFor="email" className='font-semibold text-black'>Email</label>
              <p className="p-2 rounded mt-2 bg-blue-800">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="address" className='text-black font-semibold '>Address</label>
            <textarea
              className="p-2 rounded text-black mt-2 "
              rows="5"
              placeholder="Address"
              name="address"
              value={value.address}
              onChange={handleAddressChange}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400" onClick={updateAddress}>
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
