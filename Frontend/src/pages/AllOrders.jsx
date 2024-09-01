import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/loader/Loader';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userDiv, setUserDiv] = useState("hidden");
  const [userData, setUserData] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/order/get-orders', { headers });
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/order/update-order-status/${orderId}/${headers.id}`, { status }, { headers });
      // Update the order status locally after a successful API call
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleStatusChange = (orderId, event) => {
    const newStatus = event.target.value;
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <>
      {!orders.length ? (
        <div className='h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-4 text-zinc-100">
          <h1 className="text-2xl md:text-3xl font-semibold text-black mb-3 text-center">All Orders</h1>
          <div className="bg-blue-800 w-full rounded py-2 px-4 flex gap-2 items-center text-center">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1>Price</h1>
            </div>
            
              <div className="w-[30%] md:w-[16%]">
                <h1>Status</h1>
              </div>
              
              {/* <div className="flex items-center justify-center w-[10%] md:w-[5%]">
                <h1><FaUser /></h1>
              </div> */}
          </div>
          {orders.map((order, i) => (
            <div key={order._id} className="bg-zinc-800 py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300 items-center text-center">
              <div className="w-[3%] text-center">{i + 1}</div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${order.book._id}`}
                  className="hover:text-blue-300"
                >
                  {order.book.title}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>{order.book.desc ? order.book.desc.slice(0, 50) + '...' : 'No description'}</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1>₹{order.book.price}</h1>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <div className="w-[30%] md:w-[16%]">
                  <button className="hover:scale-105 transition-all duration-300 text-center">
                    {order.status === "Order placed" ? (
                      <div className="text-yellow-500">{order.status}</div>
                    ) : order.status === "Cancelled" ? (
                      <div className="text-red-500">{order.status}</div>
                    ) : (
                      <div className="text-green-500">{order.status}</div>
                    )}
                  </button>
                </div>
                <div className="flex">
                  <select
                    name="status"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e)}
                    className="bg-gray-800 text-white"
                  >
                    <option value="Order placed">Order placed</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              {/* <div className='flex items-center text-center justify-center'>
                <button onClick={() => {
                  setUserDiv("fixed");
                  setUserData(order.user)
                }}>
                    <FaExternalLinkAlt />
                </button>
                </div> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AllOrders;
