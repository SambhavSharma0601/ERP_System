const jwt = require('jsonwebtoken');

const getUserEmailFromToken = (token) => {
 try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.email;
 } catch (error) {
    console.error('Error decoding token:', error);
    return null;
 }
};

module.exports = { getUserEmailFromToken };