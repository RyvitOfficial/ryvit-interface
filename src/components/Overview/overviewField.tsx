interface OverviewFieldProps {
  title: string;
  value: string;
  type?: 'white';
}

const OverviewField = ({ title, value, type }: OverviewFieldProps) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex justify-center items-center space-x-3">
        <div
          className={`${
            type === 'white' ? 'bg-white' : 'bg-primary'
          } w-2 h-2 rounded-full`}
        ></div>
        <p
          className={`${
            type === 'white' ? 'text-white' : 'text-secondary'
          } text-[14px]`}
        >
          {title}
        </p>
      </div>
      <div>
        <p
          className={`${
            type === 'white' ? 'text-white' : 'text-[#718EBF]'
          } text-[14px]`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default OverviewField;
