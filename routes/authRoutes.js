const { Router } = require("express");
const router = Router();
const { signUp, login } = require("../controllers/auth/authController");
const { requestOtp, verifyOtp } = require("../controllers/auth/otpContoller");
const reset = require("../controllers/auth/resetPassword");
const logOut = require("../controllers/auth/logoutController");
const validate = require("../controllers/auth/validateController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/signup", signUp);
router.post("/login", login);
router.post("/otp/request", requestOtp);
router.post("/otp/verify", verifyOtp);
router.post("/reset", reset);
router.post("/logout", authMiddleware, logOut);
router.get("/validate", validate);


module.exports = router