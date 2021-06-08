const express = require("express");
// express. Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests
const router = express.Router();

//code below is used to pull in files to access their functionality 
const { signup, login } = require("./controller/userController");
const checkIsUndefined = require("./helpers/checkIsUndefined");
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");
const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc");

//brings in middleware functions
const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware");

//used to add pre-route for all functions listed inside the parens for sign-up post requests
router.post(
  "/sign-up",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsStrongPasswordFunc,
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
  signup
);

//used to add pre-route for all functions listed inside the parens for login post requests
router.post(
  "/login",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsEmailFunc,
  login
);

module.exports = router;