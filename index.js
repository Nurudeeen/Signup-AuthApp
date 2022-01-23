const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const Users = require('./models/users');

var fs = require('fs');
var path = require('path');

require("dotenv").config();


// set up express app
const app = express();


// connect to mongodb
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected to databases')
    });
mongoose.Promise = global.Promise;

// use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// initialize routes
app.use('/api', require('./routes/api'));
app.use('/api', require('./routes/post'));
app.use('/api', require('./routes/getOne'));
app.use('/api', require('./routes/welcome'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
const upload = multer({ storage: storage });

app.get("/",  (req, res) => {
    Users.find({}, (err, images) => {
      if (err) {
          console.log(err);
          return res.status(500).send("An error occurred", err);
      } else {
          res.render("index", {image: images});
      }
    });
  });

app.post("/uploadPhoto", upload.single("myImage"), (req, res) => {
    const obj = {
        img: {
            data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
            contentType: "jpg/image/png"
        }
    }
    const newImage = new Users({
        image: obj.img
    });

    newImage.save((err) => {
        err ? console.log(err) : res.redirect("/");
    });
});
// listen for requests
app.listen(process.env.port || 3000, function(){
    console.log('now listening for requests');
});
