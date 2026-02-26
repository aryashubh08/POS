const express = require("express");
const {
  createOrder,
  verifyPayment,
  webHookVerification,
} = require("../controllers/Payment");
const { auth } = require("../middlewares/Auth");
const router = express.Router();

router.post("/create-order", auth, createOrder);
router.post("/verify-payment", verifyPayment);
router.post("/webhook-verification", auth, webHookVerification);

module.exports = router;
