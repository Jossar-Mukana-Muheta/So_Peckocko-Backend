const express = require("express");
const router = express.Router();


const userController = require("../controllers/user");

// Routes Authentification
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

module.exports = router;
