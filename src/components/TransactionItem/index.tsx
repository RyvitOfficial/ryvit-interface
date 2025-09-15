interface TransactionItemProps {
  type: 'deposit' | 'withdraw' | 'extend' | 'plan';
  title: string;
  date: string;
  amount: number;
}

const TransactionItem = ({
  type,
  title,
  date,
  amount,
}: TransactionItemProps) => {
  const isPositive = amount > 0;

  return (
    <div className="flex items-center justify-between bg-bgblack2/50 border border-border3/50 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-xl ${
            type === 'deposit'
              ? 'bg-green-600/20 text-green-500'
              : 'bg-blue-600/20 text-blue-400'
          }`}
        >
          {type === 'deposit' ? '+' : '-'}
        </div>
        <div>
          <p className="text-white text-sm font-medium">{title}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>

      <div
        className={`text-sm font-medium font-jetbrains ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isPositive ? `+${amount.toFixed(2)} XLM` : `${amount.toFixed(2)} XLM`}
      </div>
    </div>
  );
};

export default TransactionItem;
