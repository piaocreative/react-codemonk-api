/**
 * JSON Web Token class is responsible for creating the JSON Web Token
 * @name JsonWebToken
 */
const jwt = require('jsonwebtoken');

class JsonWebToken {
    static generate (data) {
        const tokenOptionalInfo = {
            algorithm: 'HS256',
            expiresIn: 60 * 60 * 24
        };
        return jwt.sign(data, process.env.JWT_SECRET, tokenOptionalInfo);
    }
}

module.exports = JsonWebToken;
