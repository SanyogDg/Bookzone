import mongoose, { Mongoose, Schema } from "mongoose";


const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    },
    avatar: {
        type: String,
        default: `https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?t=st=1720603898~exp=1720607498~hmac=ce361f1de8235aa124a70f6603d66505497782432734b708f130fbee969a6c22&w=740`
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin']
    },
    favourites: [{
        type: mongoose.Types.ObjectId,
        ref: "book",
    }],
    cart: [{
        type: Schema.Types.ObjectId,
        ref: "book",
    }],
    orders:[ {
        type: mongoose.Types.ObjectId,
        ref: "order",
    }]
}, { timestamps: true });

export const User = mongoose.model("user", user);