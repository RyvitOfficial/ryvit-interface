interface ICardProps {
  color?: string;
  bgColor?: string;
  borderColor?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card = ({
  children,
  bgColor,
  borderColor,
  onClick,
  className,
}: ICardProps) => {
  return (
    <div
      className={`${className} rounded-2xl border bg-${bgColor}`}
      style={{ backgroundColor: bgColor, border: 'solid 1px ' + borderColor }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
