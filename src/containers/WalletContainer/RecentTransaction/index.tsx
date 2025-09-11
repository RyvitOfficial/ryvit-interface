'use client';

import Card from '@/components/Card';
import TransactionItem from '@/components/TransactionItem';

const RecentTransactions = () => {
  const transactions = [
    {
      type: 'fee' as const,
      title: 'Event Listener Fee',
      date: 'Jan 15, 2024 14:30',
      amount: -0.15,
    },
    {
      type: 'deposit' as const,
      title: 'Wallet Deposit',
      date: 'Jan 15, 2024 12:15',
      amount: 6.0,
    },
    {
      type: 'ttl' as const,
      title: 'Extend TTL',
      date: 'Jan 15, 2024 14:30',
      amount: -0.78,
    },
    {
      type: 'deposit' as const,
      title: 'Wallet Deposit',
      date: 'Jan 15, 2024 12:15',
      amount: 9.0,
    },
  ];

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
        {transactions.map((tx, index) => (
          <TransactionItem
            key={index}
            type={tx.type}
            title={tx.title}
            date={tx.date}
            amount={tx.amount}
          />
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;
