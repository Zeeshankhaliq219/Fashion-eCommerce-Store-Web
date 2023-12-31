const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleWare");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/me", protect, getMe);

module.exports = router;
