import express from 'express'
import { User } from '../models/user.js';
import { authenticateToken } from './userAuth.js';

export const cartRoute = express.Router();

cartRoute.put("/add-book-to-cart",authenticateToken, async (req, res) => {
    try {
        const { bookId, id } = req.headers;

        const user = await User.findById(id);
        const bookAlreadyInCart = user.cart.includes(bookId);

        if (!user) {
            return res.status(400).json({
                message: "No User Exists!"
            })
        }

        if (bookAlreadyInCart) {
            return res.status(400).json({
                status:"Success",
                message: "Book Already In Cart!"
            })
        }

        user.cart.push(bookId);
        await user.save();
        return res.json({
            status:"Success",
            message:"Book Added To Cart!"
        })

    } catch (error) {
        return res.status(400).json({
            message:`Some Error Occured ! ${error}`
        })
    }
})

cartRoute.put("/delete-book-from-cart",authenticateToken,async (req, res) => {
    try {
        const { bookId } = req.params;
        const { id } = req.headers;

        await User.findByIdAndUpdate(id, {
            $pull : {cart:bookId}
        })

        return res.status(200).json({
            message: "Book Removed from Cart!"
        })
    } catch (error) {
        return res.status(400).json({
            message:`Some Error Occured ! ${error}`
        })
    }
})

cartRoute.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        console.log(`Fetching cart for user ID: ${id}`);
        
        const userData = await User.findById(id).populate("cart");
        
        console.log(`Userdata is shown here : ${userData}`);


        if (!userData) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        const cart = userData.cart.reverse();

        console.log(`User Cart: ${JSON.stringify(cart)}`);

        return res.json({
            status: "Success",
            data: cart
        });
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        return res.status(400).json({
            message: `Some Error Occurred! ${error}`
        });
    }
});
