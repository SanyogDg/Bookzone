import axios from 'axios';
import React, { useState } from 'react';

const AddBook = () => {
    const [data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
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
                const response = await axios.post('http://localhost:3000/api/v1/book/add-newbook', data, { headers });
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    description: "",
                    language: "",
                });
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="h-[100%] p-0 md:p-4">
            <h1 className="text-xl md:text-3xl font-semibold mb-8">
                Add Book
            </h1>

            <div className="p-4 bg-blue-900 rounded">
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
                            className="w-full mt-2 rounded-xl text-black p-2 outline-none"
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
                    className="mt-4 bg-yellow-500 text-zinc-900 font-semibold px-4 py-2 rounded hover:bg-yellow-400"
                >
                    Add Book
                </button>
            </div>
        </div>
    );
};

export default AddBook;
