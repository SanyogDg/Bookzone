import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';
import Recentlyadded from '../home/Recentlyadded';
import { IoLanguageSharp } from "react-icons/io5";

const Bookdetail = () => {
    const [book, setBook] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/book/know-book/${id}`);
                setBook(response.data.book);
                // console.log(response.data.book);
            } catch (error) {
                console.error('Error fetching the book details:', error);
            }
        };
        fetch();
    }, [id]);

    useEffect(() => {
        console.log(book);
    }, [book]);

    if (!book) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <div className='absolute bg-blue-100 min-h-screen mt-10'>
                <div className='relative flex flex-col lg:flex-row items-center lg:items-start justify-between w-full px-6 lg:px-10 lg:mt-10'>
                    <div className='bg-blue-200 rounded h-auto lg:h-[84vh] w-full lg:w-2/6 mx-6 lg:mx-0 mt-6 lg:mt-0'>
                        <img className='block mx-auto h-auto lg:h-[75vh] mt-3 mb-3' src={book.url} alt="Book cover" />
                    </div>
                    <div className='p-4 w-full lg:w-3/6 mt-5 lg:mt-0'>
                        <h1 className='text-3xl lg:text-4xl font-bold'>{book.title}</h1>
                        <p className='text-lg lg:text-xl mt-2'>By: {book.author}</p>
                        <p className='mt-4'>{book.description}</p>
                        <p className='flex items-center text-lg lg:text-xl font-medium mt-4'><IoLanguageSharp  className='me-3 text-lg lg:text-xl font-medium'/> {book.language}</p>
                        <p className='text-lg lg:text-xl mt-2'>Price: ₹ {book.price}</p>
                    </div>
                </div>
                <Recentlyadded />
            </div>
        </>
    );
};

export default Bookdetail;
