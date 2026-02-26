import React from "react";
import { FaCheckDouble, FaCircle } from "react-icons/fa6";
import { getAvatarName } from "../../utils";

const OrderList = ({ order }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center gap-4">
      {/* Avatar / Initial */}
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#f6b100]/20 text-[#f6b100] font-bold text-lg">
        {getAvatarName(order?.customerDetails?.name)}
      </div>

      {/* Main Content */}
      <div className="flex justify-between items-center w-full">
        {/* Left */}
        <div>
          <h1 className="text-slate-700 font-semibold">
            {order?.customerDetails?.name}
          </h1>
          <p className="text-sm text-slate-500">{order?.items.length} Items</p>
        </div>

        {/* Table */}
        <div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-600">
            Table {order?.table?.tableNumber}
          </span>
        </div>

        {/* Status */}
        <div className="text-right">
          {order.orderStatus === "Ready" ? (
            <>
              <p className="text-green-600 text-sm font-medium">
                <FaCheckDouble className="inline mr-1" />
                {order.orderStatus}
              </p>
              <p className="text-slate-400 text-xs flex items-center">
                <FaCircle className="inline mr-1 text-[8px] text-green-600" />
                Ready to serve
              </p>
            </>
          ) : (
            <>
              <p className="text-yellow-600 text-sm font-medium">
                <FaCheckDouble className="inline mr-1" />
                {order.orderStatus}
              </p>
              <p className="text-slate-400 text-xs flex items-center">
                <FaCircle className="inline mr-1 text-[8px] text-yellow-600" />
                Preparing your order
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
