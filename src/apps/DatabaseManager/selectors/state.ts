import { RootState } from 'system/types';

export const getActiveDatabaseConfig = (state: RootState): string | null => state.databaseManager.manager.activeDatabaseConfig;
