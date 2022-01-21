const express = require ('express');
const router = express.Router();
const Users = require('../models/users');

// get a list of user from the db
router.get('/All', function(req, res, next){
    Users.find({}).then(function(ninjas){
        res.send(ninjas);
    });
});

// update a user in the db
router.put('/update/:id', function(req, res, next){
    Users.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Users.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    }).catch(next) ; 
});

// delete a user from the db
router.delete('/remove/:id', function(req, res, next){
    Users.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});


module.exports = router;