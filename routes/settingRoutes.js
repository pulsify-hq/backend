const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getUserSettings, editSettings } = require("../controllers/settings/settingController");

router.get("/", authMiddleware, getUserSettings);
router.put("/", authMiddleware, editSettings);


module.exports = router;