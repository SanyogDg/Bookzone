import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className='absolute bg-blue-100 min-h-screen w-full flex items-center justify-center py-20'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div className='text-3xl font-bold text-center mb-6'>Signup</div>
        <form className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='username' className='mb-1 font-semibold'>Username</label>
            <input type='text' id='username' name='username' required placeholder='Username' className='p-2 border border-gray-300 rounded'/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email' className='mb-1 font-semibold'>Email</label>
            <input type='email' id='email' name='email' required placeholder='Email' className='p-2 border border-gray-300 rounded'/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='mb-1 font-semibold'>Password</label>
            <input type='password' id='password' name='password' required placeholder='Password' className='p-2 border border-gray-300 rounded'/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='phone' className='mb-1 font-semibold'>Phone</label>
            <input type='tel' id='phone' name='phone' required placeholder='Phone' className='p-2 border border-gray-300 rounded'/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='address' className='mb-1 font-semibold'>Address</label>
            <input type='text' id='address' name='address' required placeholder='Address Here' className='p-2 border border-gray-300 rounded'/>
          </div>
          <button type='submit' className='w-full bg-blue-500 text-white font-bold p-2 rounded hover:bg-blue-600 mb-4'>Sign Up</button>
        </form>
        <p className='text-center mt-4'>
          Already have an Account? &nbsp;
          {/* The &nbsp; is an HTML entity for a non-breaking space. It's used to insert a space that will not break into a new line. This is often used in HTML to ensure that the space remains between elements, even when the text is wrapped to a new line. */}
          <Link to='/login' className='hover:text-blue-700 text-blue-500'>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
