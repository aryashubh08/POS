import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import api from "../../api/axios";

const Modal = ({ setIsTableModalOpen }) => {
  const [tableData, setTableData] = useState({
    tableNumber: "",
    seats: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const payload = {
        tableNumber: Number(tableData.tableNumber),
        seats: Number(tableData.seats),
      };

      const { data } = await api.post("/v1/table/create", payload);

      if (data?.success) {
        console.log(data);
        toast.success("Table created successfully");
        setIsTableModalOpen(false);
      } else {
        toast.error(data?.message || "Failed to create table");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsTableModalOpen(false);
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-300 text-lg font-semibold">Add Table</h2>
          <button onClick={handleCloseModal} className="text-slate-300">
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">
              Table Number
            </label>
            <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
              <input
                value={tableData.tableNumber}
                onChange={handleChange}
                type="number"
                min="1"
                name="tableNumber"
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-2 text-sm font-medium">
              Number of Seats
            </label>
            <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
              <input
                value={tableData.seats}
                onChange={handleChange}
                type="number"
                min="1"
                name="seats"
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-2 text-lg bg-yellow-400 rounded-lg text-gray-900 font-bold disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Table"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;
