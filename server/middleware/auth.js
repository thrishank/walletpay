const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth_middlware = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer"))
    return res.status(411).send("Authoriztion token is missing");
  token = token.split(" ")[1];
  try {
    var decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.send(err);
  }
};

module.exports = { auth_middlware };
