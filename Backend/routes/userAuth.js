import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];

    if (token === null) {
        return res.status(401).json({
            message: "Authentication Token Required!",
        });
    }

    jwt.verify(token, "bookzone123", (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Token expired. Sign In Again!",
            });
        }

        req.user = user;
        next();
    });
}