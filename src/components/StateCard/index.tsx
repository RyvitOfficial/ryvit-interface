import { motion } from 'framer-motion';
import { JSX } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: JSX.Element;
  iconBgColor: string;
  titleColor?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  iconBgColor,
  titleColor,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl px-5 py-6 text-white shadow-md flex justify-between items-center bg-bgblack border-borderblack`}
    >
      <div className="">
        <div
          className="text-xl font-bold mt-1"
          style={{
            color: `${titleColor ? 'white' : iconBgColor}`,
          }}
        >
          {value}
        </div>
        <div className="text-md tracking-wide text-txtgray">{title}</div>
      </div>

      <div
        className="px-3 h-10 flex items-center justify-center rounded-xl"
        style={{ backgroundColor: `${iconBgColor}1A` }}
      >
        {icon}
      </div>
    </motion.div>
  );
};

export default StatCard;
