import { StrKey } from '@stellar/stellar-sdk';

import { useAppSelector } from './useRedux';

import { subContractsPage } from '@/constants/Pages';

export const useContractValidation = (contractId: string) => {
  const { contracts, isLoading } = useAppSelector((state) => state.user);

  const isContract = StrKey.isValidContract(contractId);
  const isValid = contracts.filter(
    (contract) => contract.address === contractId,
  ).length;

  const isNotFound =
    (!isContract && !subContractsPage.some((a) => a === contractId)) ||
    (!isValid && isContract);

  const isShowContractSelect =
    subContractsPage.some((a) => a !== contractId) && isContract;

  return { isLoading, isNotFound, isShowContractSelect };
};
