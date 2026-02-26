import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="p-1 text-md font-bold rounded-full text-white cursor-pointer bg-[#161E54]"
    >
      <IoArrowBack />
    </button>
  );
};

export default BackButton;
