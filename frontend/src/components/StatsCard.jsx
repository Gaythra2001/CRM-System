import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="group relative bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 border border-indigo-50 hover:border-indigo-100">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent backdrop-blur-sm" />
      <div className="relative">
        <h3 className="text-sm font-medium text-indigo-600/80 uppercase tracking-widest mb-3">
          {title}
          <span className="block w-8 h-1 bg-indigo-200 mt-2 rounded-full" />
        </h3>
        <p className="text-4xl font-extrabold text-gray-900">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
            {value}
          </span>
        </p>
      </div>
    </div>
  );
};

export default StatsCard;