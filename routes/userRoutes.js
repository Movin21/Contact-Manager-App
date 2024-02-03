const router = require("express").Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../Application/features/users");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
