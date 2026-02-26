const express = require("express");
const router = express.Router();

const {
  createOrder,
  getSingleOrder,
  getOrders,
  updateOrder,
} = require("../controllers/Order");

// CREATE ORDER
router.post("/create", createOrder);

// GET ALL ORDERS
router.get("/", getOrders);

// GET SINGLE ORDER
router.get("/:id", getSingleOrder);

// UPDATE ORDER
router.put("/:id", updateOrder);

module.exports = router;
