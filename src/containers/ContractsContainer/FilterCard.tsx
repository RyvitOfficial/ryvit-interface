import Button from '@/components/Button';
import Card from '@/components/Card';
import CInput from '@/components/Input';

import { Add, Search } from '@/assets';

interface FilterCardProps {
  search: string;
  setSearch: (value: string) => void;
  onAddContract?: () => void;
}

const FilterCard = ({ setSearch, onAddContract }: FilterCardProps) => {
  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="w-full text-white p-4 flex justify-between items-center"
    >
      <div className="w-2/6">
        <CInput
          type="text"
          placeholder="Search Contracts ..."
          inputClassName="!border-border2 font-jetbrains text-txtgray desktopMax:rounded-lg desktopMax:h-[35px] desktopMax:text-[13px]"
          border
          icon={<Search fill="#9CA3AF" />}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <Button
          color="blue"
          content="Add Contract"
          rounded="sm"
          className="!h-12 desktopMax:!h-[35px] desktopMax:text-sm"
          onClick={onAddContract}
          logo={<Add />}
        />
      </div>
    </Card>
  );
};

export default FilterCard;
