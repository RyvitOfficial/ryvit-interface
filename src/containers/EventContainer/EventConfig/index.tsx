'use client';

import { useState } from 'react';

import Card from '@/components/Card';
import CInput from '@/components/Input';
import Button from '@/components/Button';
import ColoredTag from '@/components/ColoredTag';
import AddEventModal from '@/containers/Modals/AddEventModal';
import { ToggleButtonGroup } from '@/components/ToggleButtonGroup';

import { Add, Tick } from '@/assets';

const EventConfig = () => {
  const [method, setMethod] = useState<'HTTP' | 'RabbitMQ'>('HTTP');
  const [AddEventIsOpen, setAddEventsIsOpen] = useState(false);

  const handleSelectValue = (value: string) => {};

  const handleOnClose = () => {
    setAddEventsIsOpen(false);
  };

  const handleAddEventClick = () => {
    setAddEventsIsOpen(true);
  };

  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="w-full text-white py-5 px-6"
    >
      <h2 className="font-medium text-lg font-jetbrains desktopMax:text-base">
        Event Configuration
      </h2>
      <section className="flex items-start justify-between mt-8 desktopMax:mt-4 desktopMax:gap-2 gap-4">
        <div className="w-full max-w-[50%]">
          <div className="flex flex-wrap gap-2 mt-4 w-full">
            <Button
              content="Add Event"
              color="gray"
              rounded="sm"
              logo={<Add />}
              className="text-sm !px-4 !py-1 !rounded-md h-8"
              onClick={handleAddEventClick}
            />
            <ColoredTag label="created-lockup" color="blue" />
            <ColoredTag label="cancel-lockup" color="green" />
            <ColoredTag label="withdraw-lockup" color="purple" />
          </div>
        </div>
        <div className="w-full desktopMax:w-full max-w-[50%]">
          <p className="pb-4 text-[#D1D5DB] text-sm">Delivery Method</p>
          <div className="w-full">
            <ToggleButtonGroup
              options={['HTTP', 'RabbitMQ']}
              value={method}
              onChange={setMethod}
            />

            <div className="fixScale:flex fixScale:justify-between w-full">
              <CInput
                type="text"
                placeholder={
                  method === 'HTTP'
                    ? 'https://ryvit.com/events'
                    : 'RabitMQQQQQQQQQQQQQQQQQQQQ'
                }
                inputClassName="!border-border2 mt-2 font-jetbrains text-txtgray desktopMax:rounded-lg desktopMax:h-[35px] desktopMax:text-[13px] fixScale:w-[270px]"
                border
              />
              <div className="flex items-center justify-between mt-4 desktopMax:gap-3 gap-2">
                <Button
                  type="button"
                  color="green"
                  rounded="sm"
                  content="Test Delivery"
                  logo={<Tick fill="#fff" />}
                  className="h-[35px] desktopMax:h-[35px] font-normal text-sm desktopMax:text-[13px] desktopMax:rounded-lg w-3/4 fixScale:w-full"
                />
                <Button
                  type="button"
                  color="gray"
                  rounded="sm"
                  content="Save Config"
                  className="h-[35px] font-normal text-sm desktopMax:text-[13px] desktopMax:rounded-lg w-1/4 fixScale:w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AddEventModal isOpen={AddEventIsOpen} onClose={handleOnClose} />
    </Card>
  );
};

export default EventConfig;
