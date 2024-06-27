import { DATABASE_MANAGER } from "../types";
import { initialState as managerInitialSate, setManager,  } from "./manager";
import { LocalElectronStore } from "../../../shared/types";
import { AppDispatch } from "../../../system/types";

export const loadDatabaseManagerStoreData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
    const storeManager = store?.[DATABASE_MANAGER] || managerInitialSate;
    dispatch(setManager(storeManager));
}