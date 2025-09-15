'use client';

import ContractFunction from './Functions';
import FunctionSDK from './FunctionSDK';
import ResponseOutput from './ResponseOutput';

// interface FunctionContainerProps {
//   currentContractId: string;
// }

const FunctionContainer = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-1">
        <ContractFunction />
        <div className="mt-4">
          <ResponseOutput />
        </div>
      </div>

      <div className="col-span-1">
        <FunctionSDK />
      </div>
    </div>
  );
};

export default FunctionContainer;
