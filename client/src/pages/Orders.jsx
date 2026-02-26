import React, { useEffect, useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import axios from "axios";

const Orders = () => {
  const [active, setActive] = useState("All");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const tabs = ["All", "In Progress", "Ready", "Completed"];

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://pos-jbid.vercel.app/api/v1/order/",
      );
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch orders on mount
  useEffect(() => {
    getOrders();
  }, []);

  // Filter orders whenever 'orders' or 'active' changes
  useEffect(() => {
    if (active === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter(
          (order) => order.orderStatus.toLowerCase() === active.toLowerCase(), // match status
        ),
      );
    }
  }, [orders, active]);

  return (
    <section className="bg-slate-50 min-h-[calc(100vh-8rem)] overflow-hidden mb-8 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-xl text-slate-700 font-semibold">Orders</h1>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 bg-white p-1 shadow-sm rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition
                ${
                  active === tab
                    ? "bg-[#cb131e] text-white shadow"
                    : "text-slate-500 hover:bg-slate-100"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-start mt-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center mt-10">
            No orders found.
          </p>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
