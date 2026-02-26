import React, { useEffect, useState } from "react";
import axios from "axios";
const MiniCard = ({ title, icon, number, footerNum }) => {
  return (
    <div className="bg-white p-3 rounded-lg w-[50%] shadow-lg">
      <div className="flex items-start justify-between">
        <h1 className="text-slate-700 text-lg font-semibold tracking-wide">
          {title}
        </h1>
        <button
          className={`${title === "Total Earnings" ? "bg-[#02ca3a]" : "bg-[#f6b100]"} p-3 rounded-lg text-white text-2xl`}
        >
          {icon}
        </button>
      </div>
      <div>
        <h1 className="text-slate-600 text-2xl font-bold ">
          {title === "Total Earnings" ? `₹${number}` : number}
        </h1>
        <h1 className="text-[#02ca3a]">
          {footerNum}%{" "}
          <span className="text-slate-400 text-sm">than yesterday</span>
        </h1>
      </div>
    </div>
  );
};

export default MiniCard;
