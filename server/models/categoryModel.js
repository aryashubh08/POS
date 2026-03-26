const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    categoryImage: {
      type: String,
      default: "",
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Category", categorySchema);
