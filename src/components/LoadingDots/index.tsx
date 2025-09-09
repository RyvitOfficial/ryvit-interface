'use client';

import { motion } from 'framer-motion';

function LoadingThreeDotsPulse() {
  return (
    <div className="flex justify-center items-center gap-2">
      <motion.div
        className="w-3 h-3 rounded-full bg-primary"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="w-3 h-3 rounded-full bg-primary"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-3 h-3 rounded-full bg-primary"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />
    </div>
  );
}

export default LoadingThreeDotsPulse;
