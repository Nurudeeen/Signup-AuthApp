const express = require ('express');
const welcome = express.Router();
const Users = require('../models/users');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const auth = require("../middleware/auth");

welcome.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});


welcome.post("/login", async (req, res) => {
    try {
      // Get user input
      const { Username, password } = req.body;
  
      // Validate user input
      if (!(Username && password)) return res.status(400).send("All input is required");
      
      // Validate if user exist in our database
      const user = await Users.findOne({ Username });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, Username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
       return res.status(200).json(user);
      }
      return res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });
  

module.exports = welcome;