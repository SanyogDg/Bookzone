import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [value, setValue] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const navigateTo = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (
      value.username === '' ||
      value.email === '' ||
      value.password === '' ||
      value.phone === '' ||
      value.address === ''
    ) {
      alert('Please complete the form!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/sign-up', value);
      alert(response.data.message);
      navigateTo('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
      alert(`${error.response.data.message}`);
    }
  };
  return (
    <div className='absolute bg-blue-100 min-h-screen w-full flex items-center justify-center py-20'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div className='text-3xl font-bold text-center mb-6'>Signup</div>
        <form className='space-y-4' onSubmit={submit}>
          <div className='flex flex-col'>
            <label htmlFor='username' className='mb-1 font-semibold'>Username</label>
            <input
              type='text'
              id='username'
              value={value.username}
              onChange={change}
              name='username'
              required
              placeholder='Username'
              className='p-2 border border-gray-300 rounded'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email' className='mb-1 font-semibold'>Email</label>
            <input
              type='email'
              id='email'
              value={value.email}
              onChange={change}
              name='email'
              required
              placeholder='Email'
              className='p-2 border border-gray-300 rounded'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='mb-1 font-semibold'>Password</label>
            <input
              type='password'
              id='password'
              value={value.password}
              onChange={change}
              name='password'
              required
              placeholder='Password'
              className='p-2 border border-gray-300 rounded'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='phone' className='mb-1 font-semibold'>Phone</label>
            <input
              type='tel'
              id='phone'
              value={value.phone}
              onChange={change}
              name='phone'
              required
              placeholder='Phone'
              className='p-2 border border-gray-300 rounded'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='address' className='mb-1 font-semibold'>Address</label>
            <input
              type='text'
              id='address'
              value={value.address}
              onChange={change}
              name='address'
              required
              placeholder='Address Here'
              className='p-2 border border-gray-300 rounded'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-600 mb-4'
          >
            Sign Up
          </button>
        </form>
        <p className='text-center mt-4'>
          Already have an Account?&nbsp;
          <Link to='/login' className='hover:text-blue-700 text-blue-500'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
