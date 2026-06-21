const { Router } = require("express");
const router = Router();
const{ fetchMonitors, saveMonitor, editMonitor, removeMonitor, getMonitorById } = require("../controllers/monitors/monitors");
const authMiddleware = require("../middlewares/authMiddleware");
const tierMiddleware = require("../middlewares/tierMiddleware");

router.get("/", authMiddleware, fetchMonitors);
router.get("/:id", authMiddleware, getMonitorById);
router.post("/", authMiddleware, tierMiddleware, saveMonitor);
router.put("/:id", authMiddleware, editMonitor);
router.delete("/:id", authMiddleware, removeMonitor);

module.exports = router