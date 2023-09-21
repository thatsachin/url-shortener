import authMiddleware from "../middlewares/Authenticator.js";
import getAllUrlsData from "../controllers/getAllUrlsData.js";
import createNewUrl from "../controllers/createNewUrl.js";
import deleteUrl from "../controllers/deleteUrl.js";
import updateUrl from "../controllers/updateUrl.js";
import redirectToOriginalUrl from "../controllers/redirectToOriginalUrl.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(404).json({
        "success": false,
        "message": "Page not found"
    })
})

// VIEW / ALl the URLS created by the logged in user
router.get("/all", authMiddleware, getAllUrlsData)

// CREATE new short url from long url only if user is logged in (check this via cookie)
router.post("/getshorturl", authMiddleware, createNewUrl)

// DELETE the short url from the database of a specific user (only if user is logged in)
router.delete("/del/:shorturlid", authMiddleware, deleteUrl)

// UPDATE the short url destination from the database of a specific user
router.put("/update/:shorturlid", authMiddleware, updateUrl)


router.get("/:shorturlid", redirectToOriginalUrl)

export default router