import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Updatebook() {
    const { id } = useParams();
    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: "",
    });
    const navigate = useNavigate();
    const headers = {
        id: id,  
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const submit = async () => {
        try {
            if (Object.values(data).some(field => field === "")) {
                alert("All fields are required!");
            } else {
                const response = await axios.put(
                    'http://localhost:3000/api/v1/book/update-book', 
                    data, 
                    { headers }
                );
                if (response.status === 200) {
                    alert(response.data.message);
                    navigate(`/know-book/${id}`);
                }
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Update failed');
        }
    };

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/book/know-book/${id}`);
                setData(response.data.book);
            } catch (error) {
                console.error('Error fetching the book details:', error);
            }
        };
        fetchBookDetails();
    }, [id]);

    return (
        <div className="flex flex-col justify-center items-center h-[100%] w-[100%] p-0 md:p-4 mt-9 bg-blue-200">
            <h1 className="text-xl md:text-3xl font-semibold mt-2 mb-2">
                Update Book
            </h1> 

            <div className="p-4 bg-blue-900 rounded">
                {/* Form Fields */}
                <div>
                    <label htmlFor="url" className="text-white font-semibold">Image</label>
                    <input
                        type="text"
                        id="url"
                        className="w-full mt-2 rounded-xl text-black p-2 outline-none"
                        placeholder="URL of image"
                        name="url"
                        value={data.url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="title" className="text-white font-semibold">Book Title</label>
                    <input
                        type="text"
                        id="title"
                        className="w-full mt-2 rounded-xl text-black p-2 outline-none"
                        placeholder="Title"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author" className="text-white font-semibold">Author</label>
                    <input
                        type="text"
                        id="author"
                        className="w-full mt-2 rounded-xl text-black p-2 outline-none"
                        placeholder="Author"
                        name="author"
                        value={data.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="text-white font-semibold">Description</label>
                    <textarea
                        id="description"
                        className="w-full mt-2 rounded-xl text-black p-2 outline-none"
                        placeholder="Description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>
                <div className="flex gap-4 mt-4">
                    <div className='w-1/2'>
                        <label htmlFor="language" className="text-white font-semibold">Language</label>
                        <input
                            type="text"
                            id="language"
                            className="w-full mt-2 rounded-xl text-black 100 p-2 outline-none"
                            placeholder="Language"
                            name="language"
                            value={data.language}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='w-1/2'>
                        <label htmlFor="price" className="text-white font-semibold">Price</label>
                        <input
                            type="text"
                            id="price"
                            className="w-full mt-2 rounded-xl text-black p-2 outline-none"
                            placeholder="Price"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button 
                    onClick={submit} 
                    className="flex items-center justify-center w-[100%] mt-4 bg-yellow-500 text-zinc-900 font-semibold px-4 py-2 rounded hover:bg-yellow-400"
                >
                    Update Book
                </button>
            </div>
        </div>
    );
}

export default Updatebook;
