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

  return { isLoading, isNotFound };
};
