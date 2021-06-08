const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

//function runs on signup post requests
async function signup(req, res) {
  //gives access to req.body on all variables
  const { username, email, password, firstName, lastName } = req.body;
  //keeps errorObj available locally during lifetime of request
  const { errorObj } = res.locals;
  //checks all the keys to see if they are empty and if so spits out error
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
  try {
    
    //creates encryption for passwords
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);

    //creates new user
    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    //saves the users data to database
    let savedUser = await createdUser.save();
    res.json({ message: "success", data: savedUser });

  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  }
};

//function for login
async function login(req, res) {
  const { email, password } = req.body;
  const { errorObj } = res.locals;
//checks keys for payload
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
  try {
  
    let foundUser = await User.findOne({ email: email });
//checks if data from user has email
    if (!foundUser) {
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
    } else {
 
      let comparedPassword = await bcrypt.compare(password, foundUser.password);
//checks if password is correct
      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
      } else {
//instantiates users email and username 
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          //adds a token user that expires after 1 day
          process.env.PRIVATE_JWT_KEY,
          {
            expiresIn: "1d",
          }
        );
//sends success response when correctly logged in
        res.json({ message: "success", payload: jwtToken });
      }
    }//sends error otherwise
  } catch (e) {
    res.json({ message: "error", error: e });
  }
};

module.exports = { signup, login };