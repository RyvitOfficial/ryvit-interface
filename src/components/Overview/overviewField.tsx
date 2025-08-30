import cn from 'classnames';

interface OverviewFieldProps {
  title: string;
  value: string;
  type?: 'white';
}

const OverviewField = ({ title, value, type }: OverviewFieldProps) => {
  return (
    <div className="w-full flex justify-between items-center bg-input/40 px-4 py-3 desktopMax:py-2 rounded-lg text-[15px] desktopMax:text-xs">
      <div className="flex justify-center items-center space-x-3 ">
        <div
          className={`${
            type === 'white' ? 'bg-white' : 'bg-primary'
          } w-2 h-2 rounded-full`}
        ></div>
        <p className={cn(type === 'white' ? 'text-white' : 'text-txtgray')}>
          {title}
        </p>
      </div>
      <div>
        <p className=" text-white font-jetbrains">{value}</p>
      </div>
    </div>
  );
};

export default OverviewField;
