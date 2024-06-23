import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Manager, DATABASE_MANAGER, } from '../types';
import { IpcChannel } from "shared/types";
import { setLocalAndStateReducer } from "system/utils/ipc";

export const initialState: Manager = {
    activeDatabaseConfig:null
}

const manager = createSlice({
    name:DATABASE_MANAGER,
    initialState,
    reducers:{
        setActiveDatabaseConfig: ( state: Manager, { payload: databaseConfig }: PayloadAction<JSON | null>) => {
            state.activeDatabaseConfig = databaseConfig;
            window.electron.ipc.send(IpcChannel.setStoreValue, { key: DATABASE_MANAGER, state: current(state) });
        },
        setManager: setLocalAndStateReducer<Manager>(DATABASE_MANAGER),
    },
});

export const  { setActiveDatabaseConfig, setManager} = manager.actions;

export default manager.reducer;