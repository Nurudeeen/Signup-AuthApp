const express = require ('express');
const getOne = express.Router();
const Users = require('../models/users');


getOne.get('/ID/:id', function(req, res, next){
     Users.findById({_id: req.params.id}
        ).then(function(user){
        if (!user) return res.status(404).send("User not found");
        res.send(user);
    }).catch(next);
});
// getOne.get('/ID/:id', (req, res) => {
//    try{
//        const id  = req.params.id;
//        const User =  Users.findById({_id: id});
//        if (!User) return res.status(404).send("User not found");
//        res.send(User);
//    } catch(err){
//        res.status(400).send(err);
//    }
   
// });

module.exports = getOne;