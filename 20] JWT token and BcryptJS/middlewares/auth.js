const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    let token = req.header("Authorization");
    token = token.slice(7, token.length);

    if (!token) return res.status(401).json({message: 'Token not provided'});

    jwt.verify(token, 'rnw', (err, decoded) => {
        if (err) return res.status(403).json({message: 'Invalid token'});

        req.admin = decoded;
        next();
    });
}

module.exports = adminAuth;