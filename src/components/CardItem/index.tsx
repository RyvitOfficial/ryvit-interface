interface CardItemProps {
  title: string;
  content: string;
}

const CardItem = ({ title, content }: CardItemProps) => {
  return (
    <div className="flex flex-col justify-center items-start">
      <span className="text-gray-text font-medium text-sm">{title}</span>
      <p className="text-light-gray-text text-sm font-light">{content}</p>
    </div>
  );
};

export default CardItem;
