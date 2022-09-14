const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return res.status(403).send("token is required");
  }
  try {
    token = token.replace(/^Bearer\s+/, "");
    jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ error: true, msg: "token expired or invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ error: true, msg: "Something went wrong" });
  }
};

module.exports = verifyToken;
