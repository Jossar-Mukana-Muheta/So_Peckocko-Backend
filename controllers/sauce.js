const Sauce = require("../models/sauce");
const fs = require("fs");
const { findOneAndUpdateLike, updateLike } = require("../models/sauce");

exports.getAll = (req, res, next) => {
  Sauce.find()
    
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOne = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

exports.creatOne = (req, res, next) => {
  const sauceObjet = JSON.parse(req.body.sauce);
  // Suppression de l'id car generé par defaut par la BDD
  delete sauceObjet._id;
  const sauce = new Sauce({
    ...sauceObjet,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  sauce
    .save()
    .then(res.status(201).json({ message: "sauce enregistré" }))
    .catch(res.status(401).json({ error: "ca passe pas" }));
};

exports.modifieOne = (req, res, next) => {
  // Verifier si un fichier image est inseré
  const newImg = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...newImg, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteone = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likeOne = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      let updateLike = sauce.usersLiked;
      let updateDisLike = sauce.usersDisliked;
      let user = req.body.userId;
      let sauceChoisit = req.params.id;
      let choix = req.body.like;

      if (choix === 1) {
        updateLike.push(user);
        Sauce.findOneAndUpdate(
          { _id: sauceChoisit },
          { usersLiked: updateLike, likes: updateLike.length },
          { new: true }
        )
          .then(() => res.status(201).json({ message: "Objet modifié" }))
          .catch((error) => res.status(400).json({ error }));
      } else if (choix === -1) {
        updateDisLike.push(user);
        Sauce.findOneAndUpdate(
          { _id: sauceChoisit },
          { usersDisliked: updateDisLike, dislikes: updateDisLike.length },
          { new: true }
        )
          .then(() => res.status(201).json({ message: "Objet modifié" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        if (updateLike.includes(user) === true) {
          for (let i = 0; i <= updateLike.length; i++) {
            if (updateLike.includes(user)) {
              updateLike.splice(i, 1);
            }
            break;
          }

          Sauce.findOneAndUpdate(
            { _id: sauceChoisit },
            { usersLiked: updateLike, likes: updateLike.length },
            { new: true }
          )
            .then(() => res.status(201).json({ message: "ok" }))
            .error((error) => res.status(400).json({ error }));
        } else {
          for (let i = 0; i <= updateDisLike.length; i++) {
            if (updateDisLike.includes(user)) {
              updateDisLike.splice(i, 1);
            }
            break;
          }

          Sauce.findOneAndUpdate(
            { _id: sauceChoisit },
            { usersDisliked: updateDisLike, dislikes: updateDisLike.length },
            { new: true }
          )
            .then(() => res.status(201).json({ message: "ok" }))
            .error((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => res.status(400).json({ error }));

  res.status(200).json({ message: "ok" });
};
