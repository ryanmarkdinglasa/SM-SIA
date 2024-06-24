import { SPEED_TEST_MANAGER, SPEED_TEST_RUNS, Manager, Runs } from ".";

export interface SpeedTestElectronStore {
    [SPEED_TEST_MANAGER]: Manager;
    [SPEED_TEST_RUNS]: Runs;
}
