const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders)
    return res.status(401).json({ message: "No auth headers present" });
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Access forbidden, invalid access token" });
    req.user = decoded.username;
    next();
  });
};

module.exports = { verifyJWT };
