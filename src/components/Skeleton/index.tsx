import { motion } from 'framer-motion';

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-md bg-neutral-800/40 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export default Skeleton;
