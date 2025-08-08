const { registerController, loginController, getUserController } = require("../controllers/auth.controller");

const express = require("express");

const router = express.Router();

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/getuser", getUserController)
module.exports = router;