const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({
            "message": "Auth header not found."
        })
    }

    const token = authHeader.split(" ")[1];

    if (!token){
        return res.status(401).json({
            "message": "Access token unavailable."
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.token = token;
        next();
    } catch(error){
        return res.status(401).json({
            "message": "You need to be logged in for this!"
        });
    }
};

module.exports = authMiddleware;