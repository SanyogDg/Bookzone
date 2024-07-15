import React, { useEffect, useState } from 'react'
import axios from "axios";
import Bookcard from '../bookcard/Bookcard';
import Loader from '../loader/Loader';

const Recentlyadded = () => {

  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/book/new-books")
      setData(response.data.books);
      // console.log(response.data.books)
    };
    fetch();
  }, [])

  return (
    <div className='mx-2 bg-blue-300 mt-11'>
      <h1 className='text-xl font-semibold mx-4 py-2 mt-2'>RECENTLY ADDED</h1>

      {!data &&
        <div className='flex justify-center my-8'>
          <Loader />
        </div>
      }

      <div className='mx-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 mb-8'>
        {data && data.map((items, i) => (
          <div key={i}>
            <Bookcard data={items} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recentlyadded