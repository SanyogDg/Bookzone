import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='h-screen flex flex-col md:flex-row md:h-[75vh] items-center justify-center mt-[60px] mx-2'>
      <div className='w-full lg:w-3/6 mb-12 md:mb-0 flex flex-col items-center lg:items-start justify-center mx-5'>
        <h1 className='text-4xl lg:text-6xl font-bold text-center lg:text-left'>
          Introduce Yourself to Your New Bestfriend!
        </h1>
        <p className='mt-4 text-2xl lg:text-2xl text-center lg:text-left font-semibold'>
          Because You Surely know that- "Books are the Human's Best Friend!!"
        </p>
        <div className='mt-8 text-center lg:text-left'>
          <Link to="/all-books" className='text-3xl py-2 text-center border border-blue-950 rounded-full px-10 font-semibold hover:bg-white hover:text-blue-700'>
            Discover Books
          </Link>
        </div>
      </div>
      <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
        <img src='/hero.avif' alt='hero' className='h-[25em] px-2 rounded opacity-80 sm:m-1' />
      </div>
    </div>
  );
};

export default Hero;
