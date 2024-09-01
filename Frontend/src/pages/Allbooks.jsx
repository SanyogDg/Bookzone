import React, { useEffect, useState } from 'react'
import axios from "axios";
import Bookcard from '../components/bookcard/Bookcard';
import Loader from '../components/loader/Loader';

const Allbooks = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/book/all-books")
      setData(response.data.books);
      // console.log(response.data.books)
    };
    fetch();
  }, [])

  return (
    <div className='bg-blue-300 h-screen absolute w-full mt-10 '>
      <h1 className='text-xl font-semibold mt-10 text-center'>ALL BOOKS</h1>

      {!data &&
        <div className='flex items-center justify-center mt-56'>
          <Loader/>
        </div>
      }

      <div className='mx-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 mb-8'>
        {data && data.map((items, i) => (
          <div key={i} >
            <Bookcard data={items} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Allbooks