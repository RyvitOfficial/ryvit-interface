import { AnimatedSelect } from '@/components/Select';
import SearchInput from '@/components/SearchInput';

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
        <SearchInput
          placeholder="Search by contract name or address ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-[170px_200px] gap-2 w-full justify-end">
        <AnimatedSelect
          options={statusOption}
          onChange={setSelectedStatus}
          placeholder="Filter by status"
          value={selectedStatus === '' ? 'Filter by status' : selectedStatus}
          className="desktopMax:h-[35px] desktopMax:text-[13px]"
          height="h-10"
        />

        <AnimatedSelect
          options={autoRenewOptions}
          onChange={setSelectedAutoRenew}
          placeholder="Filter by auto-renew"
          value={
            selectedAutoRenew === ''
              ? 'Filter by auto-renew'
              : selectedAutoRenew
          }
          className="desktopMax:h-[35px] desktopMax:text-[13px]"
          height="h-10"
        />
      </div>
    </div>
  );
};
export default TTLFilter;
