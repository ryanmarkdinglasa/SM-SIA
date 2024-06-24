import { DatabaseManager } from 'apps/DatabaseManager/containers';
import { AppRegistration } from 'system/types';
import speedTestReducer from './store';
import { DatabaseManagerElectronStore } from './types'
import { loadDatabaseManagerStoreData } from './store/initializer';

const DatabaseManagerRegistration: AppRegistration = {
  appId: 'databaseManaager',
  isSystemApp: false,
  initializer: loadDatabaseManagerStoreData,
  reducer: speedTestReducer
};

export {DatabaseManager, DatabaseManagerRegistration, DatabaseManagerElectronStore};
