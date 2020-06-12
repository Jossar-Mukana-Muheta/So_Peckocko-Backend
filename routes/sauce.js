const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const sauceController = require("../controllers/sauce");

//---------------- Routes Get
router.get("/",auth, sauceController.getAll);
router.get("/:id",auth, sauceController.getOne);

//--------------- Routes Post

router.post("/",auth,multer, sauceController.creatOne);

router.post("/:id/like",auth, sauceController.likeOne);

//----------------- Routes Put

router.put("/:id",auth, sauceController.modifieOne);

//----------------- Routes Delet

router.delete("/:id",auth, sauceController.deleteone);

module.exports = router;
