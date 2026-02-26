import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTable } from "../../store/slices/customerSlice";

const getRandomColor = () => {
  const colors = [
    "#2563eb",
    "#e11d48",
    "#16a34a",
    "#f59e0b",
    "#7c3aed",
    "#0d9488",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const TableCard = ({ id, name, status, initials, seats, onMakeAvailable }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (status === "Booked") return;

    dispatch(updateTable({ table: { tableId: id, tableNo: name } }));
    navigate("/menu");
  };

  const randomColor = getRandomColor();

  const isAvailable = status === "Available";

  return (
    <div
      onClick={handleClick}
      className="relative bg-white/70 backdrop-blur-md border border-gray-200 
                 p-5 rounded-2xl cursor-pointer mb-4 w-full 
                 shadow-md hover:shadow-xl transition-all duration-300 
                 hover:-translate-y-1"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700 tracking-wide">
          {name}
        </h2>

        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full 
          ${
            isAvailable
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Avatar Circle */}
      <div className="flex items-center justify-center my-6">
        <div
          className="w-20 h-20 flex items-center justify-center 
                     text-xl font-bold text-white rounded-full 
                     shadow-lg"
          style={{ backgroundColor: randomColor }}
        >
          {initials}
        </div>
      </div>

      {/* Seats Info */}
      <div className="text-center">
        <p className="text-sm text-gray-500">Total Seats</p>
        <p className="text-lg font-semibold text-gray-700">{seats}</p>
      </div>

      {/* Make Available Button */}
      {!isAvailable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMakeAvailable(id);
          }}
          className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 
                     text-white py-2 rounded-xl text-sm font-medium
                     transition-all duration-200 active:scale-95"
        >
          Make Available
        </button>
      )}
    </div>
  );
};

export default TableCard;
