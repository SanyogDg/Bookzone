import React, { useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Allbooks from './pages/Allbooks';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Bookdetail from './components/bookdetail/Bookdetail';
import Favourites from './components/profile/Favourites';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import Orderhistory from './components/profile/Orderhistory';
import Settings from './components/profile/settings';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook';
import Updatebook from './pages/Updatebook';

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (localStorage.getItem('id') && localStorage.getItem('token') && localStorage.getItem('role')) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem('role')));
    }
  }, [dispatch]);

  return (
    <div className='min-h-screen flex flex-col'>
      <Router>
        <Navbar className='relative' />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/update-book/:id' element={<Updatebook />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/all-Books' element={<Allbooks />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />}>
            {role === 'user' && <Route index element={<Favourites />} />}
            {role === 'admin' && <Route index element={<AllOrders />} />}
            {role === 'admin' && <Route path='/profile/add-book' element={<AddBook />} />}
            {role === 'user' && <Route path='/profile/orderhistory' element={<Orderhistory />} />}
            {role === 'user' && <Route path='/profile/settings' element={<Settings />} />}
            {/* Redirect to Favourites or AllOrders based on role */}
            {role === 'admin' && <Route path='*' element={<Navigate to='/profile' />} />}
          </Route>
          <Route path='/know-book/:id' element={<Bookdetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
