import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SYSTEM_MANAGER} from '../store/constants';
import {Manager} from '../types';
import {setLocalAndStateReducer} from '../utils/ipc';

export const initialState: Manager = {
  activeApp: null,
};

const manager = createSlice({
  initialState,
  name: SYSTEM_MANAGER,
  reducers: {
    setActiveApp: (state: Manager, {payload: appId}: PayloadAction<string>) => {
      state.activeApp = appId === state.activeApp ? null : appId;
    },
    setManager: setLocalAndStateReducer<Manager>(SYSTEM_MANAGER),
  },
});

export const {setActiveApp, setManager} = manager.actions;
export default manager.reducer;
