import {useSelector} from 'react-redux';
import {SpeedTest, SpeedTestRegistration, SpeedTestElectronStore } from 'apps/SpeedTest/registration';
import {University, UniversityElectronStore, UniversityRegistration} from 'apps/University/registration';
import {getManager} from 'system/selectors/state';
import {AppDataHandlers, AppRegistration, SFC} from 'system/types';

export interface AppsElectronStore extends UniversityElectronStore, SpeedTestElectronStore {}

export const appReducers = {
  university: UniversityRegistration.reducer!,
  speedTest: SpeedTestRegistration.reducer!,
};

export const appRegistrations: AppRegistration[] = [ 
  UniversityRegistration,
  SpeedTestRegistration
];

export const appRouters: AppDataHandlers = {
  university: UniversityRegistration.router!,
};

export const Apps: SFC = () => {
  const {activeApp} = useSelector(getManager);

  return (
    <>
      <University display={activeApp === UniversityRegistration.appId} />
      <SpeedTest display={activeApp === SpeedTestRegistration.appId} />
    </>
  );
};
