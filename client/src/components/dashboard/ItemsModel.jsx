import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import api from "../../api/axios";

const ItemsModal = ({ setIsItemsModelOpen }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Categories
  const getCategories = async () => {
    try {
      const { data } = await api.get("/api/v1/category/get");

      if (data?.success) {
        setCategories(data.category || []);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category || !image) {
      toast.error("All fields required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("categoryId", category);
      formData.append("image", image);

      const { data } = await api.post("/api/v1/items/create", formData);

      if (data?.success) {
        toast.success("Item created successfully");

        // reset
        setName("");
        setPrice("");
        setCategory("");
        setImage(null);

        // close modal
        setIsItemsModelOpen(false);
      } else {
        toast.error(data?.message || "Failed to create item");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsItemsModelOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleCloseModal} // ✅ outside click close
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()} // ✅ IMPORTANT FIX
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-300 text-lg font-semibold">Add Item</h2>
          <button onClick={handleCloseModal} className="text-slate-300">
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Name */}
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">
              Item Name
            </label>
            <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter item name"
                className="bg-transparent flex-1 text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">
              Price
            </label>
            <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Enter price"
                className="bg-transparent flex-1 text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">
              Select Category
            </label>
            <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-white w-full focus:outline-none"
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">
              Item Image
            </label>
            <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-white"
              />
            </div>
          </div>

          {/* Preview */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-20 h-20 object-cover rounded"
            />
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-2 text-lg bg-yellow-400 rounded-lg text-gray-900 font-bold disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ItemsModal;
