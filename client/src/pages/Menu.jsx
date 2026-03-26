import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import BillInfo from "../components/menu/BillInfo";
import { useSelector } from "react-redux";

const Menu = () => {
  const { customerName, table } = useSelector((state) => state.customer);

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-8rem)] flex flex-col lg:flex-row mb-8 px-3 lg:px-6 gap-3">
      {/* LEFT SECTION */}
      <div className="w-full lg:flex-[3]">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-md text-slate-700 font-semibold">Menu</h1>
          </div>

          <div className="flex items-center gap-3 cursor-pointer">
            <img src="/logo.webp" alt="" className="w-8 h-8 lg:w-10 lg:h-10" />
            <div className="flex flex-col">
              <h1 className="text-sm lg:text-md">
                {customerName || "Customer Name"}
              </h1>
              <p className="text-xs font-semibold">
                Table No: {table?.tableNo || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <MenuContainer />
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:flex-[1] bg-white shadow-lg rounded-lg pb-10 p-2 mt-2 lg:mt-0 max-h-[80vh] overflow-y-auto">
        <CustomerInfo />
        <hr className="my-2" />
        <CartInfo />
        <hr className="my-2" />
        <BillInfo />
      </div>

      <BottomNav />
    </div>
  );
};

export default Menu;
