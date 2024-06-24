import { SPEED_TEST_MANAGER, SPEED_TEST_RUNS } from "..";
import { initialState as managerInitialSate, setManager,  } from "./manager";
import { initialState as runsInitialSate, setRuns,  } from "./runs";
import { LocalElectronStore } from "shared/types";
import { AppDispatch } from "system/types";

export const loadSpeedTestStoreData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
    const storeManager = store?.[SPEED_TEST_MANAGER] || managerInitialSate;
    const storeRuns = store?.[SPEED_TEST_RUNS] || runsInitialSate;
    dispatch(setManager(storeManager));
    dispatch(setRuns(storeRuns));
};