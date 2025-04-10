import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LedgerState {
  ledger: number;
}

const initialState: LedgerState = {
  ledger: 0,
};

const lastLedger = createSlice({
  name: 'lastLedger',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      state.ledger = action.payload;
    },
  },
});

export const { set } = lastLedger.actions;
export default lastLedger.reducer;
