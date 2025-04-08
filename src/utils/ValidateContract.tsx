'use client';

import { useEffect } from 'react';

interface Props {
  contractAddress: string;
  onValidationResult: (isValid: boolean) => void;
}

export default function ValidateContract({
  contractAddress,
  onValidationResult,
}: Props) {
  useEffect(() => {
    const validate = async () => {
      try {
        const { StrKey } = await import('@stellar/stellar-sdk');
        const isValid = StrKey.isValidContract(contractAddress.toUpperCase());
        onValidationResult(isValid);
      } catch (e) {
        console.error('Validation failed:', e);
        onValidationResult(false);
      }
    };

    if (contractAddress) {
      validate();
    } else {
      onValidationResult(false);
    }
  }, [contractAddress, onValidationResult]);

  return null;
}
