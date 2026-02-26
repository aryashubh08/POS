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
  console.log(table);
  const [active, setActive] = useState("All");

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-8rem)] overflow-hidden flex mb-8 px-6 gap-2">
      {/* left div */}
      <div className=" flex-[3] ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-md text-slate-700 font-semibold">Menu</h1>
          </div>

          <div className="flex items-center gap-3 cursor-pointer">
            <div className="  text-white font-bold text-xl rounded-md p-1 cursor-pointer">
              <img src="/logo.webp" alt="" className="w-10 h-10" />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-md">{customerName || "Customer Name"}</h1>
              <p className="text-xs font-semibold">
                Table No:{table?.tableNo || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <MenuContainer />
      </div>
      {/* right div */}
      <div className="flex-[1] shadow-lg bg-white pt-2 pb-3 mb-8  mt-2">
        {/* customer info */}
        <CustomerInfo />
        <hr className="border-slate-200 my-1" />

        {/* cart items */}
        <CartInfo />
        <hr className="border-slate-200 my-1" />
        {/* Bills */}
        <BillInfo />
      </div>
      <BottomNav />
    </div>
  );
};

export default Menu;
