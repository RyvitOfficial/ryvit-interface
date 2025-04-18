'use client';

import { motion } from 'framer-motion';

import Button from '../Button';
import Card from '../Card';

interface AddContractCard {
  addContractOnClick: () => void;
}

const AddContractCard = ({ addContractOnClick }: AddContractCard) => {
  return (
    <Card className="w-full" bgColor="transparent" borderColor="transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl p-6 md:p-8 mt-4 w-full"
      >
        <p className="mb-6 text-base md:text-lg leading-relaxed">
          By adding your contract IDs, you will be able to manage TTL, extend
          it, or restore it as needed, providing you with greater flexibility
          and control over your contracts.
        </p>
        <Button
          type="button"
          rounded="sm"
          color="outline"
          content="Add Contract"
          onClick={addContractOnClick}
        />
      </motion.div>
    </Card>
  );
};

export default AddContractCard;
