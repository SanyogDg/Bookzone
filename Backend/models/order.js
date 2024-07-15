import mongoose, { Mongoose } from "mongoose";

const order = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "books"
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out For Delivery", "Cancelled", "Delivered"]
    }
}, { timestamps: true });

export const Order = mongoose.model("order", order);