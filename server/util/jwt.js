const jwt = require("jsonwebtoken");

const generateToken = (payload, options) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
      resolve(token);
    } catch (e) {
      reject("Token error");
    }
  });
};

const authorize = async (req, res, next) => {
  const authHeader = req.cookies.Authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Token expired or tampred, Login again",
        });
      }
      req.user = user || null;
      req.access_token = user.access_token || null;
      next();
    });
  } else {
    res.status(401).json({
      message: "Token not found",
    });
  }
};

module.exports = {
  generateToken,
  authorize,
};
