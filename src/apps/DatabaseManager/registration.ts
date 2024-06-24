import { DatabaseManager } from 'apps/DatabaseManager/containers';
import {  AppIconType, AppRegistration } from 'system/types';
import speedTestReducer from './store';
import { DatabaseManagerElectronStore } from './types'
import { loadDatabaseManagerStoreData } from './store/initializer';
import AppIcon from 'apps/SpeedTest/assets/app-icon.png';

const DatabaseManagerRegistration: AppRegistration = {
  appId: 'databaseManaager',
  icon: AppIcon,
  iconType: AppIconType.image,
  isSystemApp: false,
  initializer: loadDatabaseManagerStoreData,
  reducer: speedTestReducer
};

export {DatabaseManager, DatabaseManagerRegistration, DatabaseManagerElectronStore};
