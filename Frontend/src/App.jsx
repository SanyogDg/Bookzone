import React from 'react'
import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Allbooks from './pages/Allbooks';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Bookdetail from './components/bookdetail/Bookdetail';
const App = () => {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <Router>
          <Navbar className='relative' />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/all-Books' element={<Allbooks />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/know-book/:id' element={<Bookdetail/>} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  )
}

export default App