import React from 'react'
import Hero from '../components/home/Hero';
import Recentlyadded from '../components/home/Recentlyadded';

const Home = () => {
  return (
    <div className='bg-blue-100 text-neutral-800  px-100  w-full absolute'>
      <Hero />
      <Recentlyadded/>
    </div>
  )
}

export default Home