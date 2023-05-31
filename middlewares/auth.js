const User = require("../models/user");
const jwt = require("jsonwebtoken")

module.exports.authorized = async function (req, res, next) {
  console.log(req.headers)
  const { authorization } = req.headers;
 
  if (authorization) {
    jwt.verify(authorization, process.env.token_secret, (err, decodedToken) => {
      console.log(decodedToken)
      if (err) {
        return res.status(401).json({ "success": false, message: "Not authorized" })
      } else {
        // role based authorization can be done here
        next()
      }
    })
  } else {
    res.status(400).send({
      "success": false,
      "message": "Not Authorized"
    })
  }
}