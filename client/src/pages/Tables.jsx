import React, { useEffect, useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import api from "../api/axios";
import toast from "react-hot-toast";
import axios from "axios";

const Tables = () => {
  const [active, setActive] = useState("All");
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = ["All", "Booked"];

  const makeAvailable = async (id) => {
    try {
      const { data } = await axios.post(
        `https://pos-jbid.vercel.app/api/v1/table/update/${id}`,
        {
          status: "Available",
          orderId: null,
        },
        { withCredentials: true },
      );

      if (data.success) {
        toast.success("Table is now Available");

        setTables((prev) =>
          prev.map((table) =>
            table._id === id
              ? { ...table, status: "Available", currentOrder: null }
              : table,
          ),
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const fetchTables = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/v1/table/getTable");

      if (data?.success) {
        setTables(data.tables);
      } else {
        toast.error("Failed to fetch tables");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const filteredTables =
    active === "All"
      ? tables
      : tables.filter((table) => table.status === "Booked");

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-5rem)] overflow-hidden px-4 sm:px-6 mb-10 py-3">
      {/* HEADER */}
      <div className="flex  sm:flex-row items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-lg sm:text-xl text-slate-700 font-semibold">
            Tables
          </h1>
        </div>

        {/* Tabs (scrollable mobile) */}
        <div className="flex items-center gap-2 bg-white p-1 shadow-sm rounded-full overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`
                whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition
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

      {/* CONTENT */}
      {loading ? (
        <p className="text-center mt-10 text-slate-500">Loading tables...</p>
      ) : filteredTables.length === 0 ? (
        <p className="text-center mt-10 text-slate-500">No tables found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {filteredTables.map((table) => (
            <TableCard
              key={table._id}
              id={table._id}
              name={`${table.tableNumber}`}
              status={table.status}
              seats={table.seats}
              initials={`${table?.currentOrder?.customerDetails?.name || "NA"}`}
              onMakeAvailable={() => makeAvailable(table._id)}
            />
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Tables;
