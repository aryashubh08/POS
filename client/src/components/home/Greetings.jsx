import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Greetings = () => {
  const { user } = useSelector((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear()}`;
  };

  const formatTime = (date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-8 mt-2 gap-3 sm:gap-0">
      {/* Left Section */}
      <div>
        <h1 className="text-slate-600 text-lg sm:text-xl font-semibold tracking-wide">
          Good Morning, {user?.name}
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Give your best services for customers 😁
        </p>
      </div>

      {/* Right Section */}
      <div className="text-left sm:text-right">
        <h1 className="text-slate-600 font-bold text-base sm:text-lg">
          {formatTime(dateTime)}
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-semibold">
          {formatDate(dateTime)}
        </p>
      </div>
    </div>
  );
};

export default Greetings;
