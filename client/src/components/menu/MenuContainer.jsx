import React, { useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../store/slices/cartSlice";

const MenuContainer = () => {
  const [activeId, setActiveId] = useState(null);
  const [selected, setSelected] = useState(menus[0]);
  const [itemCount, setItemCount] = useState(0);
  const [itemId, setItemId] = useState();
  const dispatch = useDispatch();

  const increment = (id) => {
    setItemId(id);
    if (itemCount >= 3) return;
    setItemCount((prev) => prev + 1);
  };
  const decrement = (id) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (menu) => {
    if (itemCount === 0) return;
    const { name, price } = menu;
    const newObj = {
      id: new Date(),
      name,
      pricePerQuantity: price,
      quantity: itemCount,
      price: price * itemCount,
    };
    dispatch(addItems(newObj));
    setItemCount(0);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 py-4 w-full">
        {menus.map((menu) => (
          <div
            key={menu.id}
            onClick={() => {
              setActiveId(menu.id);
              setSelected(menu);
              setItemId();
            }}
            className={`flex flex-col 
            ${activeId === menu.id ? "bg-amber-100" : "bg-white"} 
            shadow-lg items-center justify-between 
            p-4 rounded-lg cursor-pointer`}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-slate-600 text-md font-semibold flex items-center gap-2">
                <img src={menu.icon} alt="" className="w-12 h-12 bg-cover" />
                {menu.name}
              </h1>

              {selected.id === menu.id && (
                <GrRadialSelected className="text-green-600" />
              )}
            </div>
          </div>
        ))}
      </div>
      <hr className="border-slate-200 mt-2" />

      {/* bottom section */}

      <div className="grid grid-cols-4 gap-2 py-4 w-full ">
        {selected?.items?.map((menu) => (
          <div
            key={menu.id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-slate-700 font-semibold">{menu.name}</h1>
                <p className="text-slate-500 text-sm">₹{menu.price}</p>
              </div>
              <img src={menu.img} alt="" className="w-16 h-16 object-contain" />
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between mt-4">
              <FaShoppingCart
                onClick={() => handleAddToCart(menu)}
                className="text-green-500 text-lg"
              />

              <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1">
                <button
                  onClick={() => decrement(menu.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-red-200 text-red-700 font-bold"
                >
                  −
                </button>

                <span className="font-semibold text-slate-700 w-4 text-center">
                  {menu.id === itemId ? itemCount : 0}
                </span>

                <button
                  onClick={() => increment(menu.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-green-200 text-green-700 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuContainer;
