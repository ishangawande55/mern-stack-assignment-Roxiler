const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(403).send("Access Denied: No token provided");
  }

  console.log("Received token:", token); // Debugging log

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        console.log("JWT verification error:", err); // Debugging log
      return res.status(403).send("Access Denied: Invalid token");
    }
    req.user = decoded;  // Attach decoded user data to the request
    next();  // Proceed to the next middleware or route handler
  });
};

module.exports = authenticate;