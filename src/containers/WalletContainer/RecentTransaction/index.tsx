'use client';

import Card from '@/components/Card';
import DateFormat from '@/utils/DateFormat';
import { useAppSelector } from '@/hooks/useRedux';
import TransactionItem from '@/components/TransactionItem';

const RecentTransactions = () => {
  const transactions = useAppSelector(
    (state) => state.user.details?.walletTransactions,
  );

  const transactionsWithTitle = transactions?.map((e) => {
    return {
      ...e,
      title:
        e.type == 'deposit'
          ? 'Wallet Deposit'
          : e.type == 'extend'
          ? 'Extend TTL'
          : e.type == 'withdraw'
          ? 'Wallet Withdraw'
          : e.type == 'plan'
          ? 'Buy Plan'
          : '',
    };
  });
  return (
    <Card
      bgColor="#121319"
      borderColor="transparent"
      className="w-full text-white py-5 px-6 h-full overflow-auto"
    >
      <h2 className="text-white text-lg font-semibold mb-4">
        Recent Transactions
      </h2>
      <div className="flex flex-col gap-3">
        {transactionsWithTitle &&
          transactionsWithTitle.map((tx, index) => (
            <TransactionItem
              key={index}
              type={tx.type}
              title={tx.title}
              date={DateFormat(tx.createdAt)}
              amount={tx.amount / 10 ** 7}
            />
          ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;
