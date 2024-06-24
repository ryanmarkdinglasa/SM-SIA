import { Config } from 'apps/DatabaseManager/types/config';

export interface Manager {
    activeDatabaseConfig: Config | null;
}
