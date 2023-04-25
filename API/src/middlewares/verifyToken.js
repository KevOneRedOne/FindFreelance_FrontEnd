const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).send(
            {
                message: 'No token provided!',
                auth : false,
                token: null,
            }
        );
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, jwtDecoded) => {
        console.log(jwtDecoded);
        if (err) {
            return res.status(401).send(
                {
                    message: 'Unauthorized!',
                    auth : false,
                    token: null,
                }
            );
        }
        req.userToken = jwtDecoded;
        next();
    });
}

module.exports = verifyToken;
