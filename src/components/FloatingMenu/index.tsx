import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Function, List, Range } from '@/assets';

interface FloatingMenuProps {
  selectedCount: number;
  show: boolean;
}

const FloatingMenu = ({ selectedCount, show }: FloatingMenuProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-[40%] -translate-x-1/2 z-50 bg-white shadow-lg border-2 border-border rounded-2xl px-4 py-1 flex items-center "
        >
          <span className="text-sm flex gap-2 mr-3">
            {selectedCount} <p className="text-[#B9BBBD]">Selected</p>
          </span>
          <div className="h-6 w-px bg-[#B9BBBD]" />

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-400/10 transition cursor-pointer">
            <Range fill="#B9BBBD" />
            Set Range
          </div>

          <div className="h-6 w-px bg-[#B9BBBD]" />

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-400/10 transition cursor-pointer">
            <Function fill="#B9BBBD" />
            Set Function
          </div>

          <div className="h-6 w-px bg-[#B9BBBD]" />

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-400/10 transition cursor-pointer">
            <List fill="#B9BBBD" />
            Set List
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingMenu;
