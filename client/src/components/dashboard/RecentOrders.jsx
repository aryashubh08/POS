import React, { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";
import { formatDateAndTime } from "../../utils";
import toast from "react-hot-toast";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders);

  // 🔹 Fetch Orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/order/");

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // 🔹 Update Order Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`https://pos-jbid.vercel.app/api/v1/order/${id}`, {
        orderStatus: newStatus,
      });

      // Update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, orderStatus: newStatus } : order,
        ),
      );
      toast.success("Status updated!");
    } catch (error) {
      console.error("Status Update Error:", error);
    }
  };

  return (
    <div className="container mx-auto bg-[#1f1f1f] overflow-hidden rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
        <span className="text-sm text-slate-400">Live Order List</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-slate-300">
          <thead className="bg-[#2a2a2a] text-slate-400">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Table</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-[#333] hover:bg-[#2a2a2a] transition"
              >
                {/* Order ID */}
                <td className="px-4 py-4 font-medium text-white">
                  #{order._id.slice(-6)}
                </td>

                {/* Customer Name */}
                <td className="px-4 py-4">
                  {order.customerDetails?.name || "N/A"}
                </td>

                {/* Status Dropdown */}
                <td className="px-4 py-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={`px-3 py-1 rounded-lg border text-xs font-medium bg-[#151515] ${
                      order.orderStatus === "Ready"
                        ? "border-green-500 text-green-400"
                        : "border-yellow-500 text-yellow-400"
                    }`}
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Ready">Ready</option>
                  </select>
                </td>

                {/* Date */}
                <td className="px-4 py-4 text-slate-400">
                  {order ? formatDateAndTime(order?.orderDate) : "N/A"}
                </td>

                {/* Items Count */}
                <td className="px-4 py-4">{order.items?.length || 0} Items</td>

                {/* 🔥 Table Fix (Object Render Error Fixed) */}
                <td className="px-4 py-4">
                  Table - {order?.table?.tableNumber || "N/A"}
                </td>

                {/* Total */}
                <td className="px-4 py-4 font-semibold text-white">
                  ₹{order.bills?.totalWithTax?.toFixed(2) || "0.00"}
                </td>

                {/* Action Button */}
                <td className="px-4 py-4 text-center">
                  <button className="p-2 rounded-full hover:bg-[#333] text-blue-400 hover:text-blue-500 transition">
                    <GrUpdate size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
