const Razorpay = require("razorpay");
require("dotenv").config();
const crypto = require("crypto");
const Payment = require("../models/paymentModel");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ================= CREATE ORDER =================
exports.createOrder = async (req, res) => {
  try {
    console.log("======= CREATE ORDER =======");
    console.log("Incoming Body:", req.body);

    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      console.log("❌ Invalid Amount");
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const amountInPaise = Math.round(Number(amount) * 100);
    console.log("Amount in Paise:", amountInPaise);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    console.log("✅ Order Created:", order.id);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("❌ Create Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};

// ================= VERIFY PAYMENT =================
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Verification Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= WEBHOOK VERIFICATION =================
exports.webHookVerification = async (req, res) => {
  try {
    console.log("======= WEBHOOK HIT =======");

    console.log("Headers:", req.headers);
    console.log("Is Buffer:", Buffer.isBuffer(req.body));

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    console.log("Received Signature:", signature);

    const body = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    console.log("Expected Signature:", expectedSignature);

    if (expectedSignature === signature) {
      const event = JSON.parse(body.toString());

      console.log("✅ Webhook Verified");
      console.log("Event Type:", event.event);

      if (
        event.event === "payment.captured" ||
        event.event === "payment.authorized"
      ) {
        const payment = event.payload.payment.entity;

        console.log("💰 Payment Data:", payment);

        try {
          const newPayment = new Payment({
            paymentId: payment.id,
            orderId: payment.order_id,
            amount: payment.amount / 100,
            currency: payment.currency,
            status: payment.status,
            method: payment.method,
            email: payment.email,
            contact: payment.contact,
            createdAt: new Date(payment.created_at * 1000),
          });

          const saved = await newPayment.save();

          console.log("✅ Saved In DB:", saved);
        } catch (dbError) {
          console.log("❌ DB Save Error:", dbError);
        }
      }

      return res.json({ success: true });
    } else {
      console.log("❌ Invalid Webhook Signature");
      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    return res.status(500).json({
      success: false,
      message: "Webhook error",
    });
  }
};
