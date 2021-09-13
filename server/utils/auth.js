const jwt = require("jsonwebtoken");
exports.createJWT = (userId, fullName, email, address, duration) => {
  const payload = {
    userId,
    fullName,
    email,
    address,
    duration,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};
