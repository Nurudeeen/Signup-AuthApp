const express = require ('express');
const getOne = express.Router();
const Users = require('../models/users');


getOne.get('/ID/:id', function(req, res, next){
     Users.findById({_id: req.params.id}
        ).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});
// getOne.get('/ID/:id', (req, res) => {
   
//    const theUser = Users.findById({_id: req.params.id});
//    if (!theUser) return res.statusCode(404).send("could not find user with this ID");
//     res.send(theUser);
// });

module.exports = getOne;