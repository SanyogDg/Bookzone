import express from 'express'
import { User } from '../models/user.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from "jsonwebtoken"
import { authenticateToken } from './userAuth.js';


export const router = express.Router();


router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address, phone } = req.body;

        if (!username || !email || !password || !address || !phone) {
            return res.status(400).json({
                message: "Please Provide All Details!"
            })
        }

        if (username.length < 3) {
            return res.status(400).json({
                message: "Username should have length greater than 3!"
            })
        }

        const userExistWithEmail = await User
            .findOne({ email: email });
        if (userExistWithEmail) {
            return res.status(400).json({
                message: "User already exists with this Email Id!"
            })
        }

        const userExistWithPhone = await User
            .findOne({ phone: phone });
        if (userExistWithPhone) {
            return res.status(400).json({
                message: "User already exists with this Phone Number!"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password length should be greater than 8!"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email: email,
            username: username,
            password: hashPassword,
            address: address,
            phone: phone,
        })

        return res.status(200).json({
            message: "Sign Up Successfully!"
        })
    } catch (error) {
        res.status(400).json({
            message: `Some error Occured ${error}.`
        })
    }
})

router.post("/sign-in", async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: "Please Provide All Details!"
            })
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({
                message: "No user Exist With this Email!"
            })
        }

        await bcrypt.compare(password, userExist.password, (error, data) => {
            if (data) {

                const authClaims = [
                    { name: userExist.username },
                    { role: userExist.role }
                ]
                const token = jwt.sign({ authClaims }, "bookzone123", {
                    expiresIn: "30d",
                })
                res.status(200).json({
                    message: "Sign In Successfully!",
                    id: userExist._id,
                    role: userExist.role,
                    token: token,
                })
            } else {
                res.status(400).json({
                    message: "Invalid Credentials!"
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            message: `Some error Occured ${error}.`
        })
    }
})

router.get("/get-user", authenticateToken, async (req, res) => {
    try {

        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            message: `Some error Occured ${error}.`
        })
    }
}
)

router.put("/update-address", async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({
            message: "Address Updated Successfully!"
        })

    } catch (error) {
        res.status(500).json({
            message: `Some error Occured ${error}.`
        })
    }
})