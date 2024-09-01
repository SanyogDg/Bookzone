import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';
import im from '../profile/norder.png'

const Orderhistory = () => {
  const [history, setHistory] = useState([]);
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/order/get-order-history', { headers });
        setHistory(response.data.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
    fetch();
  }, []);

  if (!history) {
    return (
      <div className='flex h-[80vh] items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {history.length === 0 ? (
        <div className='h-[80vh] flex flex-col items-center justify-center'>
          <h1 className='text-xl md:text-3xl font-semibold mb-6'>No Order History</h1>
          <img src={im} alt='No Order' className='h-[50%] mb-6 rounded-[90%]' />
        </div>
      ) : (
        <div className='p-4'>
          <h1 className='text-3xl md:text-4xl font-semibold mb-4'>Your Order History</h1>
          <div className='overflow-x-auto'>
            <div className='w-full border-t border-gray-300'>
              <div className='flex items-center justify-between bg-gray-100 py-2 px-4 border-b border-gray-300 font-bold text-gray-700'>
                <div className='w-[5%] text-center'>Sr.</div>
                <div className='w-[25%] text-center'>Books</div>
                <div className='w-[45%] text-center'>Description</div>
                <div className='w-[10%] text-center'>Price</div>
                <div className='w-[15%] text-center'>Status</div>
                <div className='hidden md:block w-[5%] text-center'>Mode</div>
              </div>

              {history.map((item, i) => (
                <div key={i} className='flex items-center justify-between py-2 px-4 border-b border-gray-200'>
                  <div className='w-[5%] text-center'>{i + 1}</div>
                  <div className='w-[25%] text-center'>
                    <Link to={`/know-book/${item.book.id}`} className='text-blue-500 hover:underline'>
                      {item.book.title}
                    </Link>
                  </div>
                  <div className='w-[45%] text-center'>
                    {item.book.desc ? item.book.desc.slice(0, 50) + ' ...' : 'No Description'}
                  </div>
                  <div className='w-[10%] text-center'>
                    ${item.book.price}
                  </div>
                  <div className='w-[15%] text-center'>
                    <span className={`font-semibold ${item.status === 'Order placed' ? 'text-green-600' : item.status === 'Canceled' ? 'text-red-600' : 'text-gray-600'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className='hidden md:block w-[5%] text-center'>
                    COD
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orderhistory;
