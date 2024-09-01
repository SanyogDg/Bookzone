import express from 'express';
import { User } from '../models/user.js'
import { Book } from '../models/book.js';
import { authenticateToken } from "../routes/userAuth.js"
export const brouter = express.Router();

brouter.post("/add-newbook", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        if (!id) {
            return res.status(400).json({
                message: "No Id Found!"
            })
        }
        const userData = await User.findById(id);

        if (userData.role === "user") {
            return res.status(400).json({
                message: "Action Not Permitted!"
            })
        }

        const newbook = await Book.create({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language
        })

        return res.status(200).json({
            message: "New Book Added Successfully!"
        })

    } catch (error) {
        res.status(500).json({
            message: `Some error Occured : ${error}.`
        })
    }
})

brouter.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const bookId = req.headers['id'];

        if (!bookId) {
            return res.status(400).json({ message: "No Book Found with this ID!" });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            bookId, 
            {
                url: req.body.url,
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                description: req.body.description,
                language: req.body.language
            },
            { new: true } // To return the updated document
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found!" });
        }

        return res.status(200).json({ message: "Book Info Updated Successfully!" });
    } catch (error) {
        res.status(500).json({ message: `Some error Occurred: ${error.message}` });
    }
});




brouter.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const bookId = req.headers['id'];

        if (!bookId) {
            return res.status(400).json({
                message: "No Book Found with this ID!"
            });
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found or already deleted!"
            });
        }

        return res.status(200).json({
            message: "Book deleted successfully!",
        });
    } catch (error) {
        res.status(500).json({
            message: `Some error occurred: ${error.message}`
        });
    }
});



brouter.get("/new-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ created: -1 }).limit(4);
        return res.status(200).json({
            message: "Fetched New Books Successfully",
            books,
        })
    } catch (error) {
       return res.status(500).json({
            message: `Some error Occured : ${error}.`
        })
    }
})

brouter.get("/all-books", async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({
            message: "Fetched All Books Successfully",
            books,
        })
    } catch (error) {
       return res.status(500).json({
            message: `Some error Occured : ${error}.`
        })
    }
})

brouter.get("/know-book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({
            message: "Here's Your Book!",
            book,
        })
    } catch (error) {
        return res.status(500).json({
            message: `Some error Occured : ${error}.`
        })
    }
}
)