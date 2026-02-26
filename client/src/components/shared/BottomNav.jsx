import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdTableBar, MdOutlineReorder } from "react-icons/md";
import { CgMoreO } from "react-icons/cg";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { setCustomer } from "../../store/slices/customerSlice";

const BottomNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // FIX 1

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isActive = (path) => location.pathname === path; // FIX 2

  const increment = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  };

  const { name, phone } = formData;

  // create order
  const handleCreateOrder = () => {
    dispatch(setCustomer({ name, phone, guests: guestCount }));
    navigate("/tables");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-[#111] flex justify-around items-center px-4 border-t border-gray-800">
      <button
        onClick={() => navigate("/")}
        className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition cursor-pointer"
      >
        <FaHome size={20} />
        <span className="text-xs">Home</span>
      </button>

      <button
        onClick={() => navigate("/orders")}
        className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition cursor-pointer"
      >
        <MdOutlineReorder size={20} />
        <span className="text-xs">Orders</span>
      </button>

      {/* Center Button */}
      <button
        disabled={isActive("/tables") || isActive("/menu")}
        onClick={openModal}
        className="bg-[#cb131e] text-white rounded-full p-4 -mt-8 shadow-lg cursor-pointer"
      >
        <BiSolidDish size={26} />
      </button>

      <button
        onClick={() => navigate("/tables")}
        className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition cursor-pointer"
      >
        <MdTableBar size={20} />
        <span className="text-xs">Tables</span>
      </button>

      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition cursor-pointer">
        <CgMoreO size={20} />
        <span className="text-xs">More</span>
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
        <div>
          <label className="block text-[#ababab] mb-2 font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-[#1f1f1f]">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter customer name"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>

          <label className="block text-[#ababab] mb-2 font-medium">
            Customer Phone
          </label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-[#1f1f1f]">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="number"
              placeholder="+91-9999999999"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">
              Guest
            </label>
            <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-2 rounded-lg">
              <button onClick={decrement} className="text-[#cb131e] text-xl">
                &minus;
              </button>
              <span className="text-white">{guestCount} Person</span>
              <button onClick={increment} className="text-[#cb131e] text-xl">
                &#43;
              </button>
            </div>
          </div>

          <button
            onClick={handleCreateOrder}
            className="w-full bg-[#cb131e] text-[#f5f5f5] hover:text-[#80010a] duration-200 cursor-pointer rounded-lg py-2 mt-4"
          >
            Create Order
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BottomNav;
