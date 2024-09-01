import express from 'express'
import { authenticateToken } from './userAuth.js';
import { Order } from "../models/order.js"
import { User } from "../models/user.js"
import { Book } from '../models/book.js';
export const orderRoute = express.Router();

orderRoute.post("/place-new-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        // Check if order data is valid
        if (!order || order.length === 0) {
            return res.status(400).json({ message: 'No order data provided.' });
        }

        for (const orderData of order) {
            // Create a new order
            const newOrder = await Order.create({
                user: id,
                book: orderData._id,
            });

            // Update user with new order
            await User.findByIdAndUpdate(id, {
                $push: { orders: newOrder._id }
            });

            // Remove the book from user's cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Order Placed Successfully!"
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: `Some Error Occurred: ${error.message}`,
        });
    }
});


orderRoute.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        })

        const orderData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: orderData,
        })
    } catch (error) {
        return res.status(400).json({
            message: `Some Error Occured :${error}`,
        })
    }
})

orderRoute.get("/get-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({
                path: "book" 
            })
            .populate({
                path: "user"
            })
            .sort({
                createdAt: -1
            });

        return res.json({
            status: "Success",
            data: userData,
        });
    } catch (error) {
        console.error(error); // Added for debugging
        return res.status(400).json({
            message: `Some Error Occurred: ${error.message}`,
        });
    }
});



orderRoute.put("/update-order-status/:orderId/:userId", authenticateToken, async (req, res) => {
    try {
        const { orderId, userId } = req.params;

        // Fetch user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if user is admin
        if (user.role !== 'admin') {
            return res.status(403).json({
                message: "Action Not Permitted!"
            });
        }

        // Fetch order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // Update order status
        order.status = req.body.status;
        await order.save();

        return res.status(200).json({
            message: `Status Changed To ${order.status} !`
        });

    } catch (error) {
        return res.status(400).json({
            message: `Some Error Occurred: ${error}`,
        });
    }
});
