const express = require("express");
const { createTable, getTable, updateTable } = require("../controllers/Table");
const { auth } = require("../middlewares/Auth");
const router = express.Router();

router.post("/create", auth, createTable);
router.get("/getTable", auth, getTable);
router.post("/update/:id", auth, updateTable);

module.exports = router;
