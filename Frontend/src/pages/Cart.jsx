import React, { useEffect, useState } from 'react';
import Bookcard from '../components/bookcard/Bookcard';
import axios from 'axios';
import Loader from '../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/cart/get-user-cart', { headers });
        setCart(res.data.data);
        // console.log(res.data);
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
      }
    };
  
    fetchCart();
  }, [headers]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.forEach((item) => {
        total += item.price;
      });
      setTotal(total);
    }
  }, [cart]);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/order/place-new-order', { order: cart }, { headers })
      alert(response.data.message);
      navigate("/profile/orderhistory")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='w-full min-h-screen p-6 bg-gray-50'>
      {!cart && <div className='flex items-center justify-center'>
        <Loader/>
      </div>}
      {cart.length === 0 ? (
        <div className='flex flex-col items-center justify-center mt-32'>
          <p className='text-xl font-bold text-red-600 p-4 rounded-lg bg-red-100 hover:bg-red-200'>
            No Book in cart!!
          </p>
          <img src='./emptycart.png'/>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:mt-10'>
            {cart.map((item, i) => (
              <div key={i} className='bg-white shadow-lg rounded-lg p-4'>
                <Bookcard data={item} isCart={true} />
              </div>
            ))}
          </div>
          <div className='mt-10 bg-gray-100 p-4 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold mb-2'>Total Amount:</h2>
            <p className='text-xl font-bold text-gray-800'>{total}</p>
            <div className='mt-4'>
              <button className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300' onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
