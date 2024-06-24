import {useSelector, useDispatch} from 'react-redux';
import {DatabaseManager, DatabaseManagerElectronStore, DatabaseManagerRegistration} from 'apps/DatabaseManager/registration';
import {getManager} from 'system/selectors/state';
import {AppDataHandlers, AppRegistration, SFC} from 'system/types';
import { AppDispatch } from 'system/types';
import { useEffect } from 'react';
import { setActiveApp } from 'system/store/manager';
export interface AppsElectronStore extends DatabaseManagerElectronStore {}

export const appReducers = {
  databaseManager: DatabaseManagerRegistration.reducer!,
};

export const appRegistrations: AppRegistration[] = [ 
  DatabaseManagerRegistration,
];

export const appRouters: AppDataHandlers = {
  //university: UniversityRegistration.router!,
};

export const Apps: SFC = () => {
  const {activeApp} = useSelector(getManager);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    
    if (!activeApp) {
      dispatch(setActiveApp(DatabaseManagerRegistration.appId));
    }
  }, [activeApp, dispatch]);
  //set DatabaseManager as default
  return (
    <>
      <DatabaseManager display={activeApp === DatabaseManagerRegistration.appId} />
    </>
  );
};
