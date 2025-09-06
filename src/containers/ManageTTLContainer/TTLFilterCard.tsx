import { AnimatedSelect } from '@/components/Select';
import CInput from '@/components/Input';

import { Search } from '@/assets';

const statusOption = [
  { label: 'All', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Near Expiry', value: 'near_expiry' },
  { label: 'Expired', value: 'expired' },
];

const autoRenewOptions = [
  { label: 'All', value: '' },
  { label: 'On', value: 'on' },
  { label: 'Off', value: 'off' },
];

interface TTLFilterProps {
  search: string;
  setSearch: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedAutoRenew: string;
  setSelectedAutoRenew: (value: string) => void;
}

const TTLFilter = ({
  setSearch,
  selectedStatus,
  setSelectedStatus,
  selectedAutoRenew,
  setSelectedAutoRenew,
}: TTLFilterProps) => {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="w-full">
        <CInput
          type="text"
          placeholder="Search Contracts ..."
          inputClassName="!border-none !bg-bgblack2 !rounded-lg desktopMax:h-[35px] desktopMax:text-[13px] font-jetbrains text-txtgray "
          icon={<Search fill="#9CA3AF" />}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-[170px_170px] gap-2 w-full justify-end">
        <div>
          <AnimatedSelect
            options={statusOption}
            onChange={setSelectedStatus}
            network={false}
            placeholder="All"
            value={selectedStatus}
            className="desktopMax:h-[35px] desktopMax:text-[13px] border-none "
          />
        </div>

        <div>
          <AnimatedSelect
            options={autoRenewOptions}
            network={false}
            onChange={setSelectedAutoRenew}
            placeholder="All"
            value={selectedAutoRenew}
            className="desktopMax:h-[35px] desktopMax:text-[13px] border-none"
          />
        </div>
      </div>
    </div>
  );
};
export default TTLFilter;
