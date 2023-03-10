/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import { userAuthReducer } from '../features/reducers/authSlice';
import { adminAuthReducer } from '../features/reducers/adminAuthSlice';
import { drawerReducer } from '../features/reducers/drawerSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
    drawerState: drawerReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
