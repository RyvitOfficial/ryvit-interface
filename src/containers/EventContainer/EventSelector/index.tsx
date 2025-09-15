'use client';

import { useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';

import Button from '@/components/Button';
import ColoredTagList from '@/components/ColoredTag';
import AddEventModal from '@/containers/Modals/AddEventModal';

import informSelectedEvents from '@/api/informSelectedEvents';
import { IGetContractResponse } from '@/types';

import { Add } from '@/assets';

interface EventSelectorProps {
  currentContract: IGetContractResponse;
}

const EventSelector = ({ currentContract }: EventSelectorProps) => {
  const [AddEventIsOpen, setAddEventsIsOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    currentContract.event.events.filter((e) => e.selected).map((e) => e._id),
  );

  const token = useAppSelector((state) => state.user.token);

  const toggleEvent = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );

    const events = selectedEvents.includes(id)
      ? selectedEvents.filter((e) => e !== id)
      : [...selectedEvents, id];

    informSelectedEvents(currentContract._id, events, token as string);
  };

  const handleOnClose = () => setAddEventsIsOpen(false);
  const handleAddEventClick = () => setAddEventsIsOpen(true);

  return (
    <div className="flex flex-col bg-bgblack py-5 px-6 rounded-2xl">
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-xl font-medium text-white flex items-center gap-2">
          Events
        </h2>
        <Button
          content="Add Event"
          color="gray"
          rounded="sm"
          logo={<Add />}
          className="text-sm !px-4 !py-1 h-7 desktopMax:text-xs"
          onClick={handleAddEventClick}
        />
      </div>

      <div className="flex flex-wrap justify-start h-full border border-dashed border-gray-600 rounded-xl p-4 overflow-auto">
        {currentContract.event.events.length > 0 ? (
          <ColoredTagList
            events={currentContract.event.events}
            selectedEvents={selectedEvents}
            onToggle={toggleEvent}
          />
        ) : (
          <div className="text-gray-500 flex justify-center items-center w-full h-full text-sm py-6 text-center ">
            No events added yet
          </div>
        )}
      </div>

      <AddEventModal isOpen={AddEventIsOpen} onClose={handleOnClose} />
    </div>
  );
};

export default EventSelector;
