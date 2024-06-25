import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Manager, DATABASE_MANAGER, } from '../types';
import { IpcChannel } from "shared/types";
import { setLocalAndStateReducer } from "system/utils/ipc";
import { Config } from 'apps/DatabaseManager/types/config';
import { Page } from "../types/pages";
import { User } from "../types/user";

export const initialState: Manager = {
    activeDatabaseConfig:null,
    activeKey: null,
    activeLicense: null,
    activePage: Page.databaseConfig,
    activeUser: null,
    activeToken: null,
}

const manager = createSlice({
    name:DATABASE_MANAGER,
    initialState,
    reducers:{
        setActiveToken: ( state: Manager, { payload: activeToken }: PayloadAction<string | null>) => {
            state.activeToken = activeToken;
            window.electron.ipc.send(IpcChannel.setStoreValue, { key: DATABASE_MANAGER, state: current(state) });
        },
        setActivePage: ( state: Manager, { payload: activePage }: PayloadAction<Page>) => {
            state.activePage = activePage;
            window.electron.ipc.send(IpcChannel.setStoreValue, { key: DATABASE_MANAGER, state: current(state) });
        },
        setActiveUser: ( state: Manager, { payload: activeUser }: PayloadAction<User | null>) => {
            state.activeUser = activeUser;
            window.electron.ipc.send(IpcChannel.setStoreValue, { key: DATABASE_MANAGER, state: current(state) });
        },
        setActiveKey: ( state: Manager, { payload: activeKey }: PayloadAction< string | null>) => {
            state.activeKey = activeKey;
            window.electron.ipc.send(IpcChannel.setStoreValue, { key: DATABASE_MANAGER, state: current(state) });
        },
        setActiveLicense: ( state: Manager, { payload: activeLicense }: PayloadAction< string | null>) => {
            state.activeLicense = activeLicense;
            window.electron.ipc.send(IpcChannel.setStoreValue, { key: DATABASE_MANAGER, state: current(state) });
        },
        setActiveDatabaseConfig: ( state: Manager, { payload: databaseConfig }: PayloadAction< Config | null>) => {
            state.activeDatabaseConfig = databaseConfig;
            window.electron.ipc.send(IpcChannel.setStoreValue, { key: DATABASE_MANAGER, state: current(state) });
        },
        setManager: setLocalAndStateReducer<Manager>(DATABASE_MANAGER),
    },
});

export const  { setActiveDatabaseConfig,setActiveLicense,setActiveKey, setActivePage, setActiveUser,setActiveToken, setManager} = manager.actions;

export default manager.reducer;