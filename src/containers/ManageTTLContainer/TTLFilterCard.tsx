import { useState } from 'react';

import CLabel from '@/components/Label';
import Button from '@/components/Button';
import { AnimatedSelect } from '@/components/Select';

const options1 = [
  { label: 'Active', value: 'active' },
  { label: 'Near Expiry', value: 'Near Expiry' },
  { label: 'Expired', value: 'Expired' },
];

const options2 = [
  { label: 'On', value: 'on' },
  { label: 'Off', value: 'off' },
];

const TTLFilter = () => {
  const [selectedStatusValue, setSelectedStatusValue] = useState('');
  const [selectedAutoRenewValue, setSelectedAutoRenewValue] = useState('');

  const handleSelectValue = (value: string) => {
    setSelectedStatusValue(value);
  };

  const handleSelectedAutoRenewValue = (value: string) => {
    setSelectedAutoRenewValue(value);
  };

  return (
    <div className="bg-bgblack p-5 rounded-xl items-center gap-4 w-full grid grid-cols-[1fr_1fr_1fr]">
      <div>
        <CLabel label="Status" />
        <AnimatedSelect
          options={options1}
          onChange={handleSelectValue}
          network={false}
          placeholder="All"
          value={selectedStatusValue}
          className="desktopMax:h-[35px] desktopMax:text-[13px] border-none"
        />
      </div>

      <div>
        <CLabel label="Status" />
        <AnimatedSelect
          options={options2}
          onChange={handleSelectedAutoRenewValue}
          network={false}
          placeholder="All"
          value={selectedAutoRenewValue}
          className="desktopMax:h-[35px] desktopMax:text-[13px] border-none"
        />
      </div>

      <div className="mt-6 ml-auto">
        <Button
          color="blue"
          content="Apply Filter"
          rounded="sm"
          className="!h-12 desktopMax:!h-[35px] desktopMax:text-sm"
        />
      </div>
    </div>
  );
};
export default TTLFilter;
