// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';

// import LoadingThreeDotsPulse from '@/components/LoadingDots';

// import ContractsList from '../ContractsContainer/ContractsList';

// import { useGetContracts } from '@/hooks/useGetContracts';
// import { useAppSelector } from '@/hooks/useRedux';

// const RecentContract = () => {
//   const token = useAppSelector((state) => state.user.token);

//   const { data, error, loading } = useGetContracts(token!, 'testnet');

//   let contractListStatus;

//   if (error) {
//     contractListStatus = (
//       <div className="w-full mt-[5%] flex justify-center items-center">
//         Error
//       </div>
//     );
//   }

//   if (loading) {
//     contractListStatus = (
//       <div className="mt-[10%] flex justify-center items-center">
//         <LoadingThreeDotsPulse />
//       </div>
//     );
//   }

//   if (data) {
//     if (data.length === 0) {
//       contractListStatus = (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: 'easeOut' }}
//           style={{
//             background: 'linear-gradient(to right, #E7FB05 0%, #E7FB05 93%)',
//           }}
//           className="rounded-2xl py-10 desktop:px-14 w-full !h-full xl:px-14 tablet:px-4 tablet:py-4 overflow-hidden"
//         >
//           <h1 className="text-primary font-medium text-xl mb-2">
//             No contracts have been added yet
//           </h1>
//           <p className="text-secondary">
//             To add a contract, please go to the{' '}
//             <Link href={'/contracts'} className="text-primary">
//               Contracts page
//             </Link>{' '}
//             and add your desired contract. Once added, you will be able to
//             manage it here.
//           </p>
//         </motion.div>
//       );
//     } else {
//       contractListStatus = (
//         <ContractsList data={data.length > 4 ? data.slice(0, 4) : data} />
//       );
//     }
//   }
//   return (
//     <div className="w-full">
//       {data?.length !== 0 && (
//         <h1 className="text-xl text-secondary font-[600] bg-white border border-border py-2 px-4 rounded-[12px]">
//           Recent Contract added
//         </h1>
//       )}

//       {contractListStatus}
//     </div>
//   );
// };

// export default RecentContract;
