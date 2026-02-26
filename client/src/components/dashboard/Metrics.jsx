import React from "react";
import { itemsData, metricsData } from "../../constants";

const Metrics = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-700">
            Overall Performance
          </h2>
          <p className="text-sm text-slate-400 max-w-md">
            Track your system performance and growth metrics over time.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-xs rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition">
          Last 1 Month
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className="rounded-xl p-5 text-white shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            style={{ backgroundColor: metric.color }}
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium opacity-90">{metric.title}</p>

              <div className="flex items-center gap-1 text-sm font-medium">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                >
                  <path
                    d={metric.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
                {metric.percentage}
              </div>
            </div>

            <p className="mt-3 text-3xl font-bold tracking-tight">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Item Details */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-700">
            Item Details
          </h2>
          <p className="text-sm text-slate-400 max-w-md">
            Detailed insights for individual items and trends.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {itemsData.map((item, index) => (
            <div
              key={index}
              className="rounded-xl p-5 text-white shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              style={{ backgroundColor: item.color }}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium opacity-90">{item.title}</p>

                <div className="flex items-center gap-1 text-sm font-medium">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  >
                    <path d="M5 15l7-7 7 7" />
                  </svg>
                  {item.percentage}
                </div>
              </div>

              <p className="mt-3 text-3xl font-bold tracking-tight">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
