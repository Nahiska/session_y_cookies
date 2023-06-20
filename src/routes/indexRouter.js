const express = require("express");
const router = express.Router();
const { index, data, login, welcome, destroy } = require("../controllers/indexControllers");
const validations = require("../validations/validations");
const cookieCheck = require("../middlewares/cookie");

router.get("/", cookieCheck, index);

router.post("/", validations, data);

router.get("/welcome",  welcome);

router.get("/login", login);

router.post("/logout", destroy);

module.exports = router;
