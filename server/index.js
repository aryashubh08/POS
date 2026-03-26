const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT;
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const tableRoute = require("./routes/tableRoute");
const paymentRoute = require("./routes/paymentRoute");
const categoryRoute = require("./routes/categoryRoute");
const itemsRoute = require("./routes/itemsRoute");
const db = require("./config/database");

db.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://pos-seven-pi.vercel.app/",
    credentials: true,
  }),
);

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/table", tableRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/items", itemsRoute);
app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => console.log(`App is running on PORT: ${PORT}`));
