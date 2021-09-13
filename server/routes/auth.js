const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  checkPassword,
  deleteUser,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/check-password", checkPassword);
router.post("/remove-user", deleteUser);

module.exports = router;
