import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";

const Bookcard = ({ data, favourite,isCart }) => {
    const handleRemove = async () => {
        const response = await axios.put('http://localhost:3000/api/v1/favr/delete-book-from-favourite', {},
            { headers: { authorization: `Bearer ${localStorage.getItem('token')}`,bookId:data._id, id: localStorage.getItem('id') } }
        )
        alert(response.data.message);
    }

    const handleRemoveFromCart = async () => {
        try {
            const response = await axios.put(
                'http://localhost:3000/api/v1/cart/delete-book-from-cart', 
                { bookId: data._id },  // Pass bookId in the request body
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                        id: localStorage.getItem('id')
                    }
                }
            );
            alert(response.data.message);
        } catch (error) {
            console.error('Failed to remove book from cart:', error);
            alert('Failed to remove book from cart');
        }
    };
    
    return (
        <div className='bg-blue-300 font-normal text-center flex flex-col items-center justify-center'>
            <Link to={`/know-book/${data._id}`}>
                <div className='text-white hover:text-blue-900 transition-all duration-200 lg:p-2 md:w-70vw'>
                    <div className='flex items-center justify-center mt-5'>
                        <img src={data.url} className='h-[25vh]' />
                    </div>
                    <h2 className='text-[18px]'>{data.title}</h2>
                    <p className='text-[13px] font-medium'>by {data.author}</p>
                    <p className='text-[15px]'>₹ {data.price}</p>
                </div>
            </Link>

            {favourite && (
                <button
                    className='bg-red-500 text-white hover:text-red-500 hover:bg-white text-sm mb-2 w-[70%] rounded-2xl text-center mt-2 flex items-center justify-center'
                    onClick={handleRemove}
                >
                    <MdDelete />
                    Remove from Favourites
                </button>
            )}

            {isCart && (
                <button
                    className='bg-red-500 text-white hover:text-red-500 hover:bg-white text-sm mb-2 w-[70%] rounded-2xl text-center mt-2 flex items-center justify-center'
                    onClick={handleRemoveFromCart}
                >
                    <MdDelete />
                    Remove from Cart
                </button>
            )}


        </div>

    )
}

export default Bookcard