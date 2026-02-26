import React, { useState } from "react";
import { MdCategory, MdTableBar } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payment"];
const Dashboard = () => {
  const [active, setActive] = useState("Metrics");
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  const handleOpenModal = (action) => {
    if (action === "table") setIsTableModalOpen(true);
  };

  return (
    <div className="bg-slate-50 h-[calc(100vh-5rem)]">
      <div className="container mx-auto flex items-center justify-between py-6 px-6 md:px-4">
        <div className="flex items-center gap-3">
          {buttons.map(({ label, icon, action }) => (
            <button
              key={label}
              onClick={() => handleOpenModal(action)}
              className="bg-[#1a1a1a] hover:bg-[#262626] px-6 py-2 rounded-lg text-slate-300 font-semibold text-sm flex items-center gap-2"
            >
              {label} {icon}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={` px-6 py-2 rounded-lg  font-semibold duration-200 text-sm flex items-center gap-2 ${active === tab ? "bg-yellow-400 text-black" : " bg-[#1a1a1a] text-white"}
        `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {active === "Metrics" && <Metrics />}
      {active === "Orders" && <RecentOrders />}
      {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
    </div>
  );
};

export default Dashboard;
