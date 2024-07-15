import React from 'react'
import { Link } from 'react-router-dom'

const Bookcard = ({ data }) => {
    return (
        <Link to={`/know-book/${data._id}`}>
            <div className='bg-blue-300 text-white mt-2 font-normal text-center flex flex-col hover:text-blue-900 transition-all duration-200'>
                <div className='flex items-center justify-center'>
                    <img src={data.url} className='h-[25vh]'/>
                </div>
                <h2 className='text-[18px]'>{data.title}</h2>
                <p className='text-[13px] font-medium'>by {data.author}</p>
                <p className='text-[15px] mb-4'>₹ {data.price}</p>
            </div>
        </Link>
    )
}

export default Bookcard