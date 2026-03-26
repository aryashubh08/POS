import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import api from "../../api/axios";

const CategoryModal = ({ setIsCategoryModelOpen }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      toast.error("Name and Image required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("categoryName", name);
      formData.append("image", image);

      const { data } = await api.post("/api/v1/category/create", formData);

      if (data?.success) {
        toast.success("Category created successfully");
        setIsCategoryModelOpen(false);
        setName("");
        setImage(null);
      } else {
        toast.error(data?.message || "Failed to create category");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsCategoryModelOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={handleCloseModal}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-300 text-lg font-semibold">Add Category</h2>
          <button onClick={handleCloseModal} className="text-slate-300">
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Name */}
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">
              Category Name
            </label>
            <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter category name"
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">
              Category Image
            </label>
            <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-white"
                required
              />
            </div>
          </div>

          {/* Preview (Optional 🔥) */}
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
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CategoryModal;
