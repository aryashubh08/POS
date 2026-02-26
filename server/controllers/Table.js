const Table = require("../models/tableModel");

// -------------------- CREATE TABLE --------------------
exports.createTable = async (req, res) => {
  try {
    const { tableNumber, seats } = req.body;

    // Validation
    if (!tableNumber || !seats || seats <= 0) {
      return res.status(400).json({
        success: false,
        message: "Table number and seats must be valid",
      });
    }

    // Check if table already exists
    const isTablePresent = await Table.findOne({ tableNumber });
    if (isTablePresent) {
      return res.status(400).json({
        success: false,
        message: "Table already exists!",
      });
    }

    // Create table (status defaults to "Available")
    const table = await Table.create({ tableNumber, seats });

    return res.status(201).json({
      success: true,
      message: "Table added successfully!",
      table,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// -------------------- GET TABLES --------------------
exports.getTable = async (req, res) => {
  try {
    const tables = await Table.find().populate({
      path: "currentOrder",
      select: "customerDetails ",
    });

    return res.status(200).json({
      success: true,
      tables,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// -------------------- UPDATE TABLE --------------------
exports.updateTable = async (req, res) => {
  try {
    const { status, orderId } = req.body;
    const { id } = req.params;

    // Build update object only with provided fields
    const updateData = {};
    if (status) updateData.status = status;
    if (orderId) updateData.currentOrder = orderId;

    const table = await Table.findByIdAndUpdate(id, updateData, { new: true });

    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Table updated successfully!",
      table,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// -------------------- DELETE TABLE (Optional) --------------------
exports.deleteTable = async (req, res) => {
  try {
    const { id } = req.params;

    const table = await Table.findByIdAndDelete(id);

    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Table deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
