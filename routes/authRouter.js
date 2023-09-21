import register from "../controllers/register.js";
import login from "../controllers/login.js";
import logout from "../controllers/logout.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(404).json({
        "success": false,
        "message": "Page not found"
    })
})

router.post("/register", register)

router.post("/login", login)

router.get("/logout", logout)

export default router