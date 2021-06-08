//brings in auth methods by destructuring
const {
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
} = require("../../utils/authMethods");

//function to qualify email format
function checkIsEmailFunc(req, res, next) {
  const { errorObj } = res.locals;
  if (!checkIsEmail(req.body.email)) {
    errorObj.wrongEmailFormat = "Must be in email format!";
  }
  //moves to the next function
  next();
}

//checks if data if letters
function checkIsAlphaFunc(req, res, next) {
  const { errorObj } = res.locals;
  const inComingData = req.body;
  for (key in inComingData) {
    if (key === "firstName" || key === "lastName") {
      if (!checkIsAlpha(inComingData[key])) {
        errorObj[`${key}`] = `${key} can only have characters`;
      }
    }
  }
  next();
}
//checks if username is alphanumeric
function checkIsAlphanumericFunc(req, res, next) {
  const { errorObj } = res.locals;
  if (!checkIsAlphanumeric(req.body.username)) {
    errorObj.usernameError = "username can only have characters and numbers";
  }
  next();
}

//exports all functionality from this file
module.exports = {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
};