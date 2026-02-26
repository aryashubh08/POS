import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";
import { useSelector } from "react-redux";

const Home = () => {
  // const { orders } = useSelector((state) => state.orders);
  // console.log(orders);
  return (
    <div className="bg-slate-50 h-[calc(100vh-5.5rem)]  flex gap-2 overflow-hidden">
      {/* left div */}
      <div className=" flex-[3]">
        <Greetings />
        <div className="flex items-center w-full gap-3 px-8 mt-3">
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
      </div>
      {/* right div */}
      <div className="flex-[2] ">
        <PopularDishes />
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
