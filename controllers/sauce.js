const Sauce = require("../models/sauce");

exports.getAll = (req, res, next) => {
    Sauce.find()
        .then(Sauce => res.status(200).json({Sauce}))
        .catch(error => res.status(400).json({error}))
};

exports.getOne = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(res.status(400).json({error}))
};

exports.creatOne = (req, res, next) => {
    const sauce = new Sauce({
        ...req.body
    })
    user.save()
        .then(sauce => res.status(201).json({message : res.sauce}))
        .catch(res.status(400).json({error}))

};

exports.modifieOne = (req, res, next) => {};

exports.deleteone = (req, res, next) => {};

exports.likeOne = (req, res, next) => {};
