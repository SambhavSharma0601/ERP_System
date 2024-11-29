const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
 const authorizationHeader = req.headers.authorization;
  
 if (!authorizationHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
 }

 const token = authorizationHeader.split(' ')[1]; 
 console.log(token);

 jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = decoded; 
    next();
 });
};

module.exports = verifyToken;
