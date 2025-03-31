const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    let token = req.header("Authorization");

    token = token.split(' ')[1];

    if (!token) return res.status(401).json({message: 'Token not provided'});

    jwt.verify(token, 'user', (err, decoded) => {
        if (err) return res.status(403).json({message: 'Invalid token'});

        req.user = decoded;
        next();
    });
}

module.exports = userAuth;