import { Search } from '@/assets';
import cn from 'classnames';

interface SearchInputProps {
  placeholder?: string;
  value?: string | number | any;
  border?: boolean;
  height?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  placeholder = 'search ...',
  value,
  border,
  height,
  onChange,
}: SearchInputProps) => {
  return (
    <div className="relative">
      <div className={`absolute left-3.5 top-1/2 -translate-y-1/2`}>
        <Search fill="#9CA3AF" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="false"
        enterKeyHint="search"
        className={cn(
          'bg-bgblack2 self-stretch rounded-xl placeholder-txtgray text-white text-sm w-full py-4 px-10 outline-none transition text-white/80 desktopMax:rounded-lg desktopMax:h-[35px] desktopMax:text-[13px]',
          border ? 'border border-border3' : '',
          height ? height : 'h-10',
        )}
      />
    </div>
  );
};

export default SearchInput;
