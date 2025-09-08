import Card from '@/components/Card';
import Button from '@/components/Button';
import SearchInput from '@/components/SearchInput';

import { Add } from '@/assets';

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
        <SearchInput
          placeholder="Search by contract name or address ..."
          onChange={(e) => setSearch(e.target.value)}
          border
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
