const express = require("express");
const router = express.Router();

const sauceController = require("../controllers/sauce");

//---------------- Routes Get
router.get("/", sauceController.getAll);
router.get("/:id", sauceController.getOne);

//--------------- Routes Post

router.post("/", sauceController.creatOne);

router.post("/:id/like", sauceController.likeOne);

//----------------- Routes Put

router.put("/:id", sauceController.modifieOne);

//----------------- Routes Delet

router.delete("/:id", sauceController.deleteone);

module.exports = router;
