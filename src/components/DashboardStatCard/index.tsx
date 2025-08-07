// components/DashboardStat.tsx

import React, { JSX } from 'react';

interface IDashboardStatCard {
  icon?: JSX.Element;
  label: string;
  description: string;
  value: number;
  color: string;
  iconBgColor: string;
}

const DashboardStatCard = ({
  icon,
  label,
  description,
  value,
  color,
  iconBgColor,
}: IDashboardStatCard) => {
  return (
    <div className="bg-bgblack border border-[#374151]/30 rounded-lg px-5 py-6 flex flex-col gap-3 shadow hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div
          className="bg-gray-800 h-10 w-11 rounded-md flex justify-center items-center"
          style={{ backgroundColor: `${iconBgColor}1A` }}
        >
          {icon}
        </div>

        <div className={`text-2xl font-bold ${color}`}>{value}</div>
      </div>
      <div className="space-y-1">
        <div className="text-white font-medium">{label}</div>
        <div className="text-sm text-txtgray2">{description}</div>
      </div>
    </div>
  );
};

export default DashboardStatCard;
