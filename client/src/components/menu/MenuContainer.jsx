import React, { useState, useEffect } from "react";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../store/slices/cartSlice";
import useCategoryData from "../../hooks/useCategoryData";
import useItemsData from "../../hooks/useItemsData";

const MenuContainer = () => {
  const [activeId, setActiveId] = useState(null);
  const [selected, setSelected] = useState(null);

  // ✅ FIX: per-item count
  const [counts, setCounts] = useState({});

  const { categories } = useCategoryData();
  const { items } = useItemsData(selected);

  const dispatch = useDispatch();

  // ✅ auto select first category
  useEffect(() => {
    if (categories?.category?.length > 0) {
      setSelected(categories.category[0]._id);
      setActiveId(categories.category[0]._id);
    }
  }, [categories]);

  // ✅ increment
  const increment = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, 3),
    }));
  };

  // ✅ decrement
  const decrement = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  // ✅ add to cart
  const handleAddToCart = (menu) => {
    const quantity = counts[menu._id] || 0;
    if (quantity === 0) return;

    const newObj = {
      id: new Date(),
      name: menu.name,
      pricePerQuantity: menu.price,
      quantity,
      price: menu.price * quantity,
    };

    dispatch(addItems(newObj));

    // reset that item count
    setCounts((prev) => ({ ...prev, [menu._id]: 0 }));
  };

  return (
    <>
      {/* 🔹 Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 py-4 w-full">
        {categories?.category?.map((menu) => (
          <div
            key={menu._id}
            onClick={() => {
              setActiveId(menu._id);
              setSelected(menu._id);
              setCounts({});
            }}
            className={`flex flex-col ${
              activeId === menu._id ? "bg-amber-100" : "bg-white"
            } shadow-md items-center justify-between p-3 rounded-lg cursor-pointer`}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-slate-600 text-sm sm:text-md font-semibold flex items-center gap-2">
                <img
                  src={menu.categoryImage}
                  alt=""
                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover"
                />
                {menu.categoryName}
              </h1>

              {selected === menu._id && (
                <GrRadialSelected className="text-green-600" />
              )}
            </div>
          </div>
        ))}
      </div>

      <hr className="border-slate-200 mt-2" />

      {/* 🔹 Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 py-4 w-full">
        {items?.map((menu) => (
          <div
            key={menu._id}
            className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-sm sm:text-base font-semibold text-slate-700">
                  {menu.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  ₹{menu.price}
                </p>
              </div>
              <img
                src={menu.itemImage}
                alt=""
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between mt-4">
              <FaShoppingCart
                onClick={() => handleAddToCart(menu)}
                className="text-green-500 text-lg cursor-pointer"
              />

              <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1">
                <button
                  onClick={() => decrement(menu._id)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-red-200 text-red-700 font-bold"
                >
                  −
                </button>

                <span className="font-semibold text-slate-700 w-4 text-center">
                  {counts[menu._id] || 0}
                </span>

                <button
                  onClick={() => increment(menu._id)}
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
