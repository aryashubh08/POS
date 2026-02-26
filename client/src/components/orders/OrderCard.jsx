import React from "react";
import { FaCheckDouble, FaCircle } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import { formatDateAndTime, getAvatarName } from "../../utils";

const OrderCard = ({ order }) => {
  // console.log(order);
  return (
    <div
      className="
      bg-white rounded-md cursor-pointer
      p-4 shadow-sm 
      hover:shadow-md transition-all duration-200
    "
    >
      {/* Top */}
      <div className="flex  justify-between items-center gap-12">
        {/* Left */}
        <div className="flex items-start gap-3">
          <div className="bg-[#f6b100] w-10 h-10 flex items-center justify-center font-semibold text-black rounded-lg shrink-0">
            {getAvatarName(order.customerDetails.name)}
          </div>

          <div className="flex flex-col">
            <h1 className="text-slate-700 whitespace-nowrap font-semibold text-sm ">
              {order?.customerDetails?.name}
            </h1>
            <p className="text-xs text-slate-500">
              #{Math.floor(new Date(order.orderDate).getTime())} · Dine In
            </p>
          </div>
        </div>

        {/* Right (Date + Items) */}
        <div className="">
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

      {/* Status */}
      <div className=" flex items-center justify-between mt-3">
        <p className="text-xs text-slate-500">
          {formatDateAndTime(order?.orderDate)}
        </p>
        <p className="text-xs text-slate-600 font-medium">
          {order.items.length} Items
        </p>
      </div>

      <hr className="w-full mt-4 border-t-1 border-slate-200" />
      <div className="flex items-center justify-between mt-2">
        <h1 className="text-slate-700">Total</h1>
        <p className="text-slate-600">₹{order?.bills?.total}</p>
      </div>
    </div>
  );
};

export default OrderCard;
