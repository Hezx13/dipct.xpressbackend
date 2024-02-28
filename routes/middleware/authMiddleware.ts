import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => { 
    const SECRET_KEY = process.env.SECRET_KEY || 'generic'
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).send('Access denied. No token provided.');

        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

export default authMiddleware;