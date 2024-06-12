import AppIcon from 'apps/SpeedTest/assets/app-icon.png';
import { SpeedTest } from 'apps/SpeedTest/containers';
import { AppIconType, AppRegistration } from 'system/types';
import speedTestReducer from './store';
import { SpeedTestElectronStore } from './types'
import { loadSpeedTestStoreData } from './store/initializer';

const SpeedTestRegistration: AppRegistration = {
  appId: 'speedTest',
  icon: AppIcon,
  iconType: AppIconType.image,
  isSystemApp: false,
  initializer: loadSpeedTestStoreData,
  reducer: speedTestReducer
};

export {SpeedTest, SpeedTestRegistration, SpeedTestElectronStore};
