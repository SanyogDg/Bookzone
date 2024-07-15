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

        const isBookFavourite = user.favourites.includes(bookId);

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
        const { bookId, id } = req.headers;

        const userData = await User.findById(id);

        const isBookInFavourite = await userData.favourites.includes(bookId);

        if (isBookInFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookId } });
        }

        return res.status(200).json({
            message: "Book Removed from Favourites!"
        })

    } catch (error) {
        return res.status(500).json({
            message: `Some error Occurred: ${error.message}.`
        });
    }
})


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
