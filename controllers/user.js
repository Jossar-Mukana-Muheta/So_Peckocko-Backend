const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

let key = "JAVASCRIPTNODEJSREACTJS1234567890";

exports.createUser = (req, res, next) => {
  // Cryptage mdp
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      let password = hash;

      // Chiffrage mdp
      const cipher = crypto.createCipher("aes128", key);
      let passwordEncrypted = cipher.update(password, "utf8", "hex");
      passwordEncrypted += cipher.final("hex");

      // Création + sauvegarder user en bdd
      const user = new User({
        email: req.body.email,
        password: passwordEncrypted,
      });
      user
        .save()
        .then(() => res.status(200).json({ message: "Utilisateur crée !" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      } else {
        let user_password = req.body.password;
        // Déchiffrage
        let passwordEncrypted = user.password;
        const decipher = crypto.createDecipher("aes128", key);
        let passwordDecrypted = decipher.update(
          passwordEncrypted,
          "hex",
          "utf8"
        );
        passwordDecrypted += decipher.final("utf8");

        // Comparaison
        bcrypt
          .compare(user_password, passwordDecrypted)
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
