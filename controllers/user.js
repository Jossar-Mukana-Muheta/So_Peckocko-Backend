const User = require("../models/user");
const bcrypt = require('bcrypt')



exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email : req.body.email,
                password: hash
            });
            user.save()
                .then(()=>res.status(200).json({message:"Utilisater crée !"}))
                .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({error}))
};

exports.loginUser = (req, res, next) => {};
