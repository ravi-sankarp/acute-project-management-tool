/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../App/store';
import { IAuth } from '../../../Types/UserInterface';

const initialState = {
  data: {
    drawerOpen: false
  }
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleDrawer(state) {
      state.data.drawerOpen = !state.data.drawerOpen;
    }
  }
});

export const { toggleDrawer } = drawerSlice.actions;

export const selectDrawerState = (state: RootState) => state.drawerState.data.drawerOpen;

export const drawerReducer = drawerSlice.reducer;
