import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import Recentlyadded from '../home/Recentlyadded';
import { IoLanguageSharp } from "react-icons/io5";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Bookdetail = () => {
    const [book, setBook] = useState(null);
    const { id } = useParams();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();
    // console.log(role);
    // console.log(isLoggedIn);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/book/know-book/${id}`);
                setBook(response.data.book);
            } catch (error) {
                console.error('Error fetching the book details:', error);
            }
        };
        fetchBookDetails();
    }, [id]);

    const headers = {
        id: id,
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    if (!book) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                'http://localhost:3000/api/v1/book/delete-book',
                {
                    headers: {
                        id: id, // Use the ID from useParams()
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );
    
            alert(response.data.message);
            navigate('/all-books');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                alert("Session expired. Please sign in again.");
                navigate('/login'); // Redirect to login or handle re-authentication
            } else {
                alert(`Error: ${error.response?.data?.message || error.message}`);
            }
        }
    };
    
    


    const handleFavourite = async () => {
        const response = await axios.put(
            'http://localhost:3000/api/v1/favr/add-book-to-favourites',
            { bookId: id },
            { headers: { authorization: `Bearer ${localStorage.getItem('token')}`, id: localStorage.getItem('id') } }
        );
        alert(response.data.message);
    }

    const handleCart = async () => {
        const response = await axios.put(
            'http://localhost:3000/api/v1/cart/add-book-to-cart',
            { bookId: id },
            { headers: { authorization: `Bearer ${localStorage.getItem('token')}`, id: localStorage.getItem('id') } }
        );
        alert(response.data.message);
    }


    return (
        <div className='absolute bg-blue-100 min-h-screen mt-10'>
            <div className='relative flex flex-col lg:flex-row items-center lg:items-start justify-between w-full px-6 lg:px-10 lg:mt-10'>
                <div className='bg-blue-200 rounded h-auto lg:h-[84vh] w-full lg:w-2/6 mx-6 lg:mx-0 mt-6 lg:mt-0'>
                    <div className='md:flex md:flex-row sm:flex-col'>
                        <img
                            className='block mx-auto h-auto lg:h-[75vh] mt-3 mb-3'
                            src={book.url}
                            alt="Book cover"
                        />
                        {isLoggedIn === true && role === 'user' &&
                            (<div className='flex md:flex-col items-center justify-center px-3'>
                                <button>
                                    <FaHeart className='text-pink-600 hover:bg-white rounded p-2 text-5xl transition-all duration-200' onClick={handleFavourite} />
                                </button>
                                <button className='md:mt-4'>
                                    <FaShoppingCart className='text-green-600 hover:bg-white rounded p-2 text-5xl transition-all duration-200' onClick={handleCart} />
                                </button>
                            </div>)
                        }

                        {isLoggedIn === true && role === 'admin' &&
                            (<div className='flex md:flex-col items-center justify-center px-3'>
                                <Link to={`/update-book/${id}`}>
                                    <FaEdit className='text-blue-600 hover:bg-white rounded p-2 text-5xl transition-all duration-200' />
                                </Link>
                                <button className='md:mt-4' onClick={handleDelete}>
                                    <MdDelete className='text-red-600 hover:bg-white rounded p-2 text-6xl transition-all duration-200' />
                                </button>
                            </div>)
                        }
                    </div>
                </div>
                <div className='p-4 w-full lg:w-3/6 mt-5 lg:mt-0'>
                    <h1 className='text-3xl lg:text-4xl font-bold'>{book.title}</h1>
                    <p className='text-lg lg:text-xl mt-2'>By: {book.author}</p>
                    <p className='mt-4'>{book.description}</p>
                    <p className='flex items-center text-lg lg:text-xl font-medium mt-4'>
                        <IoLanguageSharp className='me-3 text-lg lg:text-xl font-medium' />
                        {book.language}
                    </p>
                    <p className='text-lg lg:text-xl mt-2'>Price: ₹ {book.price}</p>
                </div>
            </div>
            <Recentlyadded />
        </div>
    );
};

export default Bookdetail;
