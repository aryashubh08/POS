import React from "react";
import { popularDishes } from "../../constants";

const PopularDishes = () => {
  return (
    <div className="mt-6 pr-6 pb-2">
      <div className="bg-white/70 backdrop-blur-xl  border border-slate-200 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4">
          <h1 className="font-semibold text-slate-800 text-lg">
            Popular Dishes
          </h1>
          <button className="text-blue-600 text-sm font-medium">
            View all →
          </button>
        </div>

        {/* List */}
        <div className="max-h-[420px] overflow-y-auto px-3 pb-3">
          {popularDishes.map((dish, index) => (
            <div
              key={dish.id}
              className="group flex items-center justify-between p-3 mb-2 rounded-xl bg-white hover:scale-[1.02] hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={dish.image}
                  className="w-14 h-14 rounded-xl object-cover"
                  alt=""
                />
                <div>
                  <h1 className="text-slate-800 font-semibold">{dish.name}</h1>
                  <p className="text-sm text-slate-500">
                    {dish.numberOfOrders} orders
                  </p>
                </div>
              </div>

              {/* Rank */}
              <div className="text-right">
                <p className="text-xs text-slate-400">Rank</p>
                <p className="text-lg font-bold text-indigo-600">
                  #{index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
