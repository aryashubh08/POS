import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-5.5rem)] flex flex-col lg:flex-row gap-4 overflow-hidden px-4 sm:px-8 pb-10">
      {/* LEFT SECTION */}
      <div className="flex-[3]">
        <Greetings />

        <div className="flex flex-col sm:flex-row w-full gap-3 mt-3">
          <MiniCard
            title="Total Earnings"
            icon={<BsCashCoin />}
            number={512}
            footerNum={1.6}
          />
          <MiniCard
            title="In Progress"
            icon={<GrInProgress />}
            number={16}
            footerNum={3.6}
          />
        </div>

        <RecentOrders />

        {/* MOBILE ONLY */}
        <div className="block lg:hidden mt-3">
          <PopularDishes />
        </div>
      </div>

      {/* RIGHT SECTION (DESKTOP ONLY) */}
      <div className="hidden lg:block flex-[2]">
        <PopularDishes />
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
