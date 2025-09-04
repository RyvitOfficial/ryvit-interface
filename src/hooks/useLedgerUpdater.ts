import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getLatestLedger } from '@/utils/getLatestLedger';

const useLedgerUpdater = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLedger = async () => {
      await getLatestLedger();
    };

    fetchLedger();
    const intervalId = setInterval(fetchLedger, 2000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return null;
};

export default useLedgerUpdater;
