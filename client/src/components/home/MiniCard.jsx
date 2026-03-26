import React from "react";

const MiniCard = ({ title, icon, number, footerNum }) => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg w-full sm:w-[50%] shadow-lg">
      <div className="flex items-start justify-between">
        <h1 className="text-slate-700 text-sm sm:text-lg font-semibold tracking-wide">
          {title}
        </h1>

        <button
          className={`${
            title === "Total Earnings" ? "bg-[#02ca3a]" : "bg-[#f6b100]"
          } p-2 sm:p-3 rounded-lg text-white text-xl sm:text-2xl`}
        >
          {icon}
        </button>
      </div>

      <div className="mt-2">
        <h1 className="text-slate-600 text-xl sm:text-2xl font-bold">
          {title === "Total Earnings" ? `₹${number}` : number}
        </h1>

        <h1 className="text-[#02ca3a] text-sm sm:text-base">
          {footerNum}%{" "}
          <span className="text-slate-400 text-xs sm:text-sm">
            than yesterday
          </span>
        </h1>
      </div>
    </div>
  );
};

export default MiniCard;
