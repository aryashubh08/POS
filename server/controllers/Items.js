const Items = require("../models/itemsModel");
const Category = require("../models/categoryModel");
const imageKit = require("../config/imageKit");

// Create Item
exports.createItem = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

    if (!name || !price || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "Name, Price and CategoryId required!",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Item image is required",
      });
    }

    // check category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const itemImage = req.file;
    const fileBuffer = itemImage.buffer;

    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: itemImage.originalname,
      folder: "/POS",
    });

    const optimizedImageUrl = response.url;

    const item = await Items.create({
      name,
      price,
      categoryId,
      itemImage: optimizedImageUrl,
    });
    await Category.findByIdAndUpdate(categoryId, {
      $push: { items: item._id },
    });

    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Items By Category
exports.getItemsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "CategoryId is required",
      });
    }

    const items = await Items.find({ categoryId: categoryId });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
