import { RootState } from 'system/types';
import { Page, User } from '../types/';

export const getActiveDatabaseConfig = (state: RootState): string | null => state.databaseManager.manager.activeDatabaseConfig;
export const getActivePage= (state: RootState): Page => state.databaseManager.manager.activePage;
export const getActiveKey = (state: RootState): string | null => state.databaseManager.manager.activeKey;
export const getActiveLicense = (state: RootState): string | null => state.databaseManager.manager.activeLicense;
export const getActiveUser = (state: RootState): User | null => state.databaseManager.manager.activeUser;
export const getActiveToken = (state: RootState): User | null => state.databaseManager.manager.activeToken;