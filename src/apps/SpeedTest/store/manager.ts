import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Manager, SPEED_TEST_MANAGER, } from '../types';
import { IpcChannel } from "shared/types";
import { setLocalAndStateReducer } from "system/utils/ipc";

export const initialState: Manager = {
    activeAccountNumber:null,
    activeNetworkId: null
}

const manager = createSlice({
    name:SPEED_TEST_MANAGER,
    initialState,
    reducers:{
        setActiveAccountNumber: ( state: Manager, { payload: accountNumber }: PayloadAction<string | null>) => {
            state.activeAccountNumber = accountNumber;
            window.electron.ipc.send(IpcChannel.setStoreValue, { key: SPEED_TEST_MANAGER, state: current(state) });
        },
        setActiveNetworkId: ( state: Manager, { payload: networkId }: PayloadAction<string | null>) => {
            state.activeNetworkId = networkId;
            window.electron.ipc.send(IpcChannel.setStoreValue, { key: SPEED_TEST_MANAGER, state: current(state) });
        },
        setManager: setLocalAndStateReducer<Manager>(SPEED_TEST_MANAGER),
    },
})

export const  { setActiveAccountNumber, setActiveNetworkId, setManager} = manager.actions;

export default manager.reducer;