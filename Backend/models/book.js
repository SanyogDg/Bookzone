import mongoose, { Mongoose } from "mongoose";

const book = new mongoose.Schema({
    url: {
        type: String,
        required:true,
    },
    title: {
        type: String,
        required:true
    },
    author: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    language: {
        type: String,
        required:true
    }
}, { timestamps: true });

export const Book = new mongoose.model("book", book);