import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import OrderList from "./OrderList";
import axios from "axios";

const RecentOrders = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://pos-jbid.vercel.app/api/v1/order/",
      );

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log("Error fetching orders:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // 🔥 Search Filter Logic
  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase();

    return (
      order.customerDetails?.name?.toLowerCase().includes(searchValue) ||
      order.customerDetails?._id?.toLowerCase().includes(searchValue) ||
      order.orderStatus?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="p-8">
      <div className="w-full h-[280px] bg-white rounded-lg px-6 shadow-md border border-slate-100">
        {/* Header */}
        <div className="flex justify-between items-center py-3 border-b">
          <h1 className="font-semibold text-slate-700 text-lg">
            Recent Orders
          </h1>

          {/* Search */}
          <div className="flex items-center gap-3 bg-slate-100 w-[60%] rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-red-400 transition">
            <IoIosSearch className="text-[#CB131E] text-lg" />
            <input
              type="text"
              placeholder="Search orders..."
              className="bg-transparent text-slate-700 outline-none w-full placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <a
            href="#"
            className="text-blue-500 text-sm font-medium hover:underline"
          >
            View All
          </a>
        </div>

        {/* Order List */}
        <div className="mt-3 space-y-2 overflow-y-auto h-[195px] pr-2 scrollbar-thin scrollbar-thumb-slate-300">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderList key={order._id} order={order} />
            ))
          ) : (
            <p className="text-center text-gray-400">No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
