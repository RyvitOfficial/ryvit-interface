import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LedgerState {
  ledger: number;
  close: number;
}

const initialState: LedgerState = {
  ledger: 0,
  close: 3000,
};

const lastLedger = createSlice({
  name: 'lastLedger',
  initialState,
  reducers: {
    setLastLedger: (state, action: PayloadAction<number>) => {
      state.ledger = action.payload;
    },
    setCloseLedger: (state, action: PayloadAction<number>) => {
      state.close = action.payload;
    },
  },
});

export const { setLastLedger, setCloseLedger } = lastLedger.actions;
export default lastLedger.reducer;
