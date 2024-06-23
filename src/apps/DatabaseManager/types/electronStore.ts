import { DATABASE_MANAGER, Manager } from ".";

export interface DatabaseManagerElectronStore {
    [DATABASE_MANAGER]: Manager;
}
