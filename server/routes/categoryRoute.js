const express = require("express");
const upload = require("../middlewares/multer");
const { createCategory, getCategory } = require("../controllers/Category");
const router = express.Router();

router.post("/create", upload.single("image"), createCategory);
router.get("/get", getCategory);

module.exports = router;
