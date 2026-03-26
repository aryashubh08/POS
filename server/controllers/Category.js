const Category = require("../models/categoryModel");
const imageKit = require("../config/imageKit");

// create category
exports.createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const categoryImage = req.file;

    const response = await imageKit.upload({
      file: categoryImage.buffer,
      fileName: categoryImage.originalname,
      folder: "/POS",
    });

    console.log("ImageKit Response:", response); // 🔍 debug

    // ✅ FIXED
    const optimizedImageUrl = response.url;

    const newCategory = await Category.create({
      categoryName,
      categoryImage: optimizedImageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Category Created Successfully!",
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get category
exports.getCategory = async (req, res) => {
  try {
    // const { categoryId } = req.params;

    const category = await Category.find().populate("items");

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
