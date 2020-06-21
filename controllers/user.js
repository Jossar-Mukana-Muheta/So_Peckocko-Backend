const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

let key = "JAVASCRIPTNODEJSREACTJS1234567890";

exports.createUser = (req, res, next) => {
  //chiffrage

  let user_password  = req.body.password;
  let encrypte = crypto
    .createCipher("aes-256-ctr", key)
    .update(user_password , "utf-8", "hex");

  console.log(encrypte);

  bcrypt
    .hash(encrypte, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(200).json({ message: "Utilisateur crée !" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.loginUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      } else {
          // chiffrage
        let user_password = req.body.password;
        let encrypte = crypto
          .createCipher("aes-256-ctr", key)
          .update(user_password , "utf-8", "hex");

        console.log(encrypte);

        bcrypt
          .compare(encrypte, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
