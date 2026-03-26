import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaRegBell, FaRegUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { removeUser } from "../../store/slices/userSlice";
import { MdDashboard } from "react-icons/md";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const { data } = await api.post("/api/v1/auth/logout");
    if (data.success) {
      toast.success("Logged out!");
      dispatch(removeUser());
      navigate("/auth");
    }
  };

  return (
    <div className="flex justify-between items-center py-2 px-4 sm:px-8 shadow-sm bg-white">
      {/* logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.webp" alt="" className="w-10 h-10 sm:w-12 sm:h-12" />
        <h1 className="text-base sm:text-lg font-semibold text-slate-700">
          Restro
        </h1>
      </Link>

      {/* search (HIDDEN on small screens) */}
      <div className="hidden md:flex items-center gap-3 border rounded-lg px-4 py-2 w-[320px]">
        <IoIosSearch className="text-[#CB131E] text-xl" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-full"
        />
      </div>

      {/* right */}
      <div className="flex items-center gap-2 sm:gap-4 relative">
        {/* bell */}
        <button className="bg-[#cb131e] text-white p-2 rounded-md">
          <FaRegBell />
        </button>

        {/* dashboard (admin only) */}
        {user?.role === "Admin" && (
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#2e2e2e] text-white p-2 rounded-md"
          >
            <MdDashboard />
          </button>
        )}

        {/* profile */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-[#161E54] text-white p-2 rounded-full">
            <FaRegUserCircle />
          </div>

          {/* hide text on small screens */}
          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold">{user?.name}</h1>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>
        </div>

        {/* dropdown */}
        {open && (
          <div className="absolute z-50 right-0 top-12 sm:top-14 overflow-hidden w-40 sm:w-44 bg-white shadow-lg rounded-lg border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-red-50"
            >
              <IoLogOut className="text-xl" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
