const router = require("express").Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../Application/features/users");
router.post("/register",registerUser);

router.post("/login",  loginUser);

router.get("/current",currentUser);

module.exports = router;
