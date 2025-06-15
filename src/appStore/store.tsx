import {configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import authReducer from '../components/auth/authSlice';
import uiReducer from "../components/ui/uiSlice";
import bankAccountReducer from "../components/userAccounts/bankAccountSlice";
//import xmlReducer from "../components/stellar/xlmSlice";
//import etherumReducer from "../components/etherum/ethersSlice";

//Here we wire up our different State Reducers from thier Slices
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    ui: uiReducer,
    userBankAccounts: bankAccountReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;