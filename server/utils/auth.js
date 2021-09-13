const jwt = require("jsonwebtoken");
exports.createJWT = (
  userId,
  username,
  email,
  duration
) => {
  const payload = {
    userId,
    username,
    email,
    duration,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};
