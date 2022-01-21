const express = require ('express');
const post = express.Router();
const Users = require('../models/users');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// add a new ninja to the db
post.post("/new", async (req, res) => {
    try {
      // Get user input
      const { Username, age,  password } = req.body;
  
      // Validate user input
      if (!(password && Username && age)) return res.status(400).send("All input is required");

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await Users.findOne({ Username });
  
      if (oldUser) return res.status(409).send("User Already Exist. Please Login");
      
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await Users.create({
        Username,
        age,
        //email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword
      });
  
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
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = post;