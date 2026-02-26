import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, getAvatarName } from "../../utils";

const CustomerInfo = () => {
  const { customerName, orderId } = useSelector((state) => state.customer);
  const [dateTime, setDateTime] = useState(new Date());
  return (
    <div>
      <div className="flex items-center justify-between px-3">
        <div className="flex flex-col items-start">
          <h1 className="text-md text-slate-600 font-semibold tracking-wide">
            {customerName || "Customer Name"}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {orderId} / Dine in
          </p>
          <p className="text-xs text-slate-500">{formatDate(dateTime)}</p>
        </div>
        <button className="bg-[#f6b100] p-1 rounded-md">
          {getAvatarName(customerName) || "CN"}
        </button>
      </div>
    </div>
  );
};

export default CustomerInfo;
