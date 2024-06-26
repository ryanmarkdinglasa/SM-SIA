/*
import Store from 'electron-store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {DATABSE_CONFIGURATION} from '../types'
import { getActiveDatabaseConfig } from '../selectors';



export const useDatabaseConfig = () => {
  const config = useSelector(getActiveDatabaseConfig);
  const store = new Store();

  useEffect(() => {
    if (config) {
        window.electron.ipc.on
    } else {
      
    }
  }, [config]);
};
*/