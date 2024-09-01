import express from 'express';
import { authenticateToken } from "../routes/userAuth.js";
import { User } from '../models/user.js';
import { Book } from '../models/book.js'
export const favRouter = express.Router();

favRouter.put("/add-book-to-favourites", authenticateToken, async (req, res) => {
    try {
        const { bookId } = req.body; // Get bookId from request body
        const { id } = req.headers; // Get user id from authenticated user

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                message: "No User Found!"
            });
        }

        if (!user.favourites) {
            user.favourites = [];
        }

        // Use the correct method to check if the book is already in favourites
        const isBookFavourite = user.favourites.some(favBookId => favBookId && favBookId.toString() === bookId);

        if (isBookFavourite) {
            return res.status(200).json({ message: "Book Already In Favourites!" });
        }

        user.favourites.push(bookId);
        await user.save();

        return res.status(200).json({
            message: "Book Added To Favourites!"
        });

    } catch (error) {
        return res.status(500).json({
            message: `Some error Occurred: ${error.message}.`
        });
    }
});



favRouter.put("/delete-book-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;  // Change to req.body to access the data correctly

        const userData = await User.findById(id);

        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        const isBookInFavourite = userData.favourites.includes(bookid);

        if (isBookInFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
            return res.status(200).json({ message: "Book removed from Favourites!" });
        } else {
            return res.status(400).json({ message: "Book not found in Favourites." });
        }

    } catch (error) {
        return res.status(500).json({
            message: `Some error Occurred: ${error.message}.`
        });
    }
});



// SOME ERROR IN FETCHING FAVOURITE BOOK:-
favRouter.get("/get-favourite-book", async (req, res) => {
    try {
        const { id } = req.headers;
       
        const user = await User.findById(id).populate("favourites");
        const favBook = user.favourites;

        return res.status(200).json({
            favBook,
            message:"Favourite Book Fetched Successfully!"
        })

    } catch (error) {
        console.error("Error occurred:", error); // Debugging line
        return res.status(500).json({
            message: `Some error occurred: ${error.message}.`
        });
    }
});
