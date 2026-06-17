const express = require('express');
const app = express();
const authRouter = require("./routes/authRoutes");
const monitorRouter = require("./routes/monitorRoutes");
const settingRouter = require("./routes/settingRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const { deleteAccount } = require("./controllers/settings/settingController");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/auth", authRouter)
app.use("/monitors", monitorRouter);
app.use("/settings", settingRouter);
app.delete("/account", authMiddleware, deleteAccount);
app.use((req, res)=>{
    req.statusCode(404).json({
        message: "Page not found"
    });
})

module.exports = app