interface CLabelProps {
  label?: string;
  htmlFor?: string;
  className?: string;
  noneMargin?: boolean;
}

const CLabel = ({ label, htmlFor, className, noneMargin }: CLabelProps) => {
  return (
    <div className={`flex items-start ml-1  ${className}`}>
      <label
        htmlFor={htmlFor}
        className={`text-[15px] font-inter font-[400] text-[#343C6A] ${
          noneMargin ? '' : 'mb-2 '
        }flex`}
      >
        {label}
      </label>
    </div>
  );
};

export default CLabel;
