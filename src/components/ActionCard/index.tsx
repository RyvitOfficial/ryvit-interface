import Link from 'next/link';
import React from 'react';

interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  borderColor: string;
  iconBg: string;
  bg: string;
  href: string;
}

const ActionCard = ({
  icon,
  label,
  description,
  borderColor,
  bg,
  iconBg,
  href,
}: ActionCardProps) => {
  return (
    <Link
      href={href}
      className={`rounded-lg p-4 flex items-center gap-4 border hover:shadow-lg transition duration-200 cursor-pointer hover:brightness-90`}
      style={{
        backgroundColor: `${bg}`,
        border: `1px solid ${borderColor}1A`,
      }}
    >
      <div
        className={`h-10 w-10 flex justify-center items-center rounded-md`}
        style={{ backgroundColor: `${iconBg}` }}
      >
        {icon}
      </div>
      <div>
        <div className="text-white font-medium">{label}</div>
        <div className="text-sm text-gray-400">{description}</div>
      </div>
    </Link>
  );
};

export default ActionCard;
