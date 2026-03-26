const express = require("express");
const upload = require("../middlewares/multer");

const router = express.Router();
const { createItem, getItemsByCategory } = require("../controllers/Items");

router.post("/create", upload.single("image"), createItem);
router.get("/get/:categoryId", getItemsByCategory);

module.exports = router;
