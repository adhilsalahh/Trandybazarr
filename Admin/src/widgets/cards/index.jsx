import React from "react";

export const StatisticsCard = ({ title, value, icon, footer }) => (
  <div className="p-4 bg-white shadow rounded">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-500 rounded-full">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
    {footer && <div className="mt-2">{footer}</div>}
  </div>
);
