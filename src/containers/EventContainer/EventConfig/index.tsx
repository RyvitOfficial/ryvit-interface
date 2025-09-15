'use client';

import Card from '@/components/Card';
import { IGetContractResponse } from '@/types';
import EventSelector from '../EventSelector';
import DeliveryConfig from '../DeliveryConfig';

interface EventConfigProps {
  currentContract: IGetContractResponse;
}

const EventConfig = ({ currentContract }: EventConfigProps) => {
  return (
    <Card
      bgColor="transparent" //#121319
      borderColor="transparent"
      className="w-full text-white" //py-5 px-6
    >
      <section className="grid grid-cols-2 small:grid-cols-1 gap-6 mt-2">
        <EventSelector currentContract={currentContract} />
        <DeliveryConfig currentContract={currentContract} />
      </section>
    </Card>
  );
};

export default EventConfig;
