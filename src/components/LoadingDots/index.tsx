'use client';

import { motion } from 'framer-motion';

function LoadingThreeDotsPulse() {
  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      animate="pulse"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="flex justify-center items-center gap-5"
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-primary"
        variants={dotVariants}
      />
      <motion.div
        className="w-5 h-5 rounded-full bg-primary"
        variants={dotVariants}
      />
      <motion.div
        className="w-5 h-5 rounded-full bg-primary"
        variants={dotVariants}
      />
    </motion.div>
  );
}

export default LoadingThreeDotsPulse;
