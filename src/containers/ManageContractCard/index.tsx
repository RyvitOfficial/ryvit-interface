import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

import Button from '@/components/Button';

import ManageContractModal from '../Modals/ManageContractModal';

import { IGetContractResponse } from '@/types';

interface ManageContractCard {
  details: IGetContractResponse;
  ExtendOnClick: () => void;
  exntedDisabled: boolean;
}

const ManageContractCard = ({
  details,
  ExtendOnClick,
  exntedDisabled,
}: ManageContractCard) => {
  const [isOpen, setIsOpen] = useState(false);

  const AddDataKeyOnClick = () => {};

  const ModalOnClose = () => {
    setIsOpen(false);
  };

  const ManageOnClick = () => {
    setIsOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(to right, #1B59F8 0%, #194BCB 93%)',
      }}
      className="rounded-2xl !py-10 md:p-8 !px-14 w-full !h-full"
    >
      <section className="h-full flex flex-col justify-between">
        <div className="flex justify-start items-center">
          <div className="mr-4 h-full">
            <Image
              src="/images/crypto.png"
              alt="crypto"
              width={70}
              height={70}
            />
          </div>
          <div className="flex flex-col items-start justify-between text-white h-full">
            <h3 className="text-3xl font-[600] leading-relaxed tracking-wide">
              {details.name}
            </h3>
            <p className="font-extralight text-lg leading-1">
              {details.address}
            </p>
          </div>
        </div>

        <div className="flex space-x-6">
          <Button
            type="button"
            variant="simple"
            color="darkBlue"
            content="Extend / Restore"
            onClick={ExtendOnClick}
            className="w-[35%]"
            disabled={exntedDisabled}
          />

          <Button
            type="button"
            variant="simple"
            color="white"
            content="Manage"
            onClick={ManageOnClick}
          />
          <Button
            type="button"
            variant="simple"
            color="white"
            content="Add DataKey"
            onClick={AddDataKeyOnClick}
          />
        </div>
      </section>

      <ManageContractModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={ModalOnClose}
        settings={details.settings}
        id={details._id}
      />
    </motion.div>
  );
};

export default ManageContractCard;
