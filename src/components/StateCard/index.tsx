import { motion } from 'framer-motion';
import { JSX } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: JSX.Element;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl p-5 text-white shadow-md flex flex-col justify-between  ${color}`}
    >
      <div className="text-3xl">{icon}</div>
      <div className="">
        <div className="text-sm uppercase tracking-wide opacity-80">
          {title}
        </div>
        <div className="text-2xl font-bold mt-1">{value}</div>
      </div>
    </motion.div>
  );
};

export default StatCard;
