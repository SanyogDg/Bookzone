import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Bookcard from '../bookcard/Bookcard';
import Loader from '../loader/Loader'
const Favourites = () => {
  const [favBooks, setFavBooks] = useState('');
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/favr/get-favourite-book', { headers });
      setFavBooks(response.data.favBook);
      // console.log(response.data.favBook);
    }
    fetch();
  }, [favBooks])
  return (
    <div className='lg:flex gap-4  w-full min-h-screen'>
      {favBooks.length > 0 ? (
        favBooks.map((item, i) => (
          <div key={i}>
            <Bookcard data={item} favourite={true} />
          </div>
        ))
      ) : (
          <div className='flex flex-grow items-center justify-center align-middle'>
            <p className='text-xl font-bold bg-red-400 p-2 rounded-lg hover:bg-red-600'>No Books in Favourites!!</p>
        </div>
      )}
    </div>
  )
}

export default Favourites