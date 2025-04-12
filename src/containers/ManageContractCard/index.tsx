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
      className="rounded-2xl py-10 desktop:px-14 w-full !h-full xl:px-14 tablet:px-4 tablet:py-4 overflow-hidden"
    >
      <section className="h-full flex flex-col justify-between">
        <div className="flex justify-start items-center">
          <div className="mr-4 h-full tablet:hidden mobile:hidden">
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
            <p className="font-extralight desktop:text-lg tablet:text-md leading-1 break-all">
              {details.address}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 tablet:gap-2 tablet:flex-wrap w-full">
          <div className="w-[35%] tablet:w-full">
            <Button
              type="button"
              rounded="sm"
              color="darkBlue"
              content="Extend / Restore"
              onClick={ExtendOnClick}
              className="!w-full tablet:!h-10 tablet:!w-full tablet:my-2"
              disabled={exntedDisabled}
            />
          </div>

          <div className="flex gap-6 w-[65%] tablet:w-full">
            <Button
              type="button"
              rounded="sm"
              color="white"
              content="Manage"
              onClick={ManageOnClick}
              className="tablet:!w-full tablet:!h-10"
            />
            <Button
              type="button"
              rounded="sm"
              color="white"
              content="Add DataKey"
              onClick={AddDataKeyOnClick}
              className="tablet:!w-full tablet:!h-10"
            />
          </div>
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
