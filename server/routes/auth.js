const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  checkPassword,
  deleteUser,
  changePassword,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/check-password", checkPassword);
router.delete("/remove-user", deleteUser);
router.post("/change-password", changePassword);

module.exports = router;
