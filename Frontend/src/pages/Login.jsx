import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {authActions} from '../store/auth'
const Login = () => {
  const [value, setValue] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (value.email === '' || value.password === '') {
      alert('Please complete the form!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/sign-in', value);
      // Handle successful login (e.g., store token, navigate to another page, etc.)
      // console.log(response);
      alert(response.data.message)
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigateTo('/profile'); // Replace with the appropriate route
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
      alert(error.response?.data?.message || 'An error occurred. Please try again later.');
    }
  };

  return (
    <div className='absolute bg-blue-100 min-h-screen w-full flex items-center justify-center py-20'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div className='text-3xl font-bold text-center mb-6'>Login</div>
        {error && <div className='text-red-500 text-center mb-4'>{error}</div>}
        <form className='space-y-4' onSubmit={submit}>
          <div className='flex flex-col'>
            <label htmlFor='username' className='mb-1 font-semibold'>email</label>
            <input
              type='text'
              id='email'
              value={value.email}
              onChange={change}
              name='email'
              required
              placeholder='email'
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
          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-600 mb-4'
          >
            Sign In
          </button>
        </form>
        <p className='text-center mt-4'>
          Don't have an Account?&nbsp;
          <Link to='/signup' className='hover:text-blue-700 text-blue-500'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
