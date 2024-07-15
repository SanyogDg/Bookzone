import jwt from 'jsonwebtoken';
// import { User } from '../models/user';


export const authenticateToken = (req,res,next) => {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];

    if (token === null) {
        res.status(401).json({
            message:"Authentication Token Requied!",
        })
    }

    jwt.verify(token, "bookzone123", (err, user) => {
        if (err) {
            res.status(403).json({
                message:"Token expired.Sign In Again!"
            })
        }

        req.user = user;
        next();
    })

}