import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getActiveDatabaseConfig, getActiveLicense } from '../selectors';
import { baseUrl } from '../routes';
import { setActivePage } from '../store/manager';
import { Page } from '../types';

export const useWindowRender = () => {
  const activeConfig = useSelector(getActiveDatabaseConfig);
  const activeLicense = useSelector(getActiveLicense);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLicense = async () => {
      try {
        // Ensure activeLicense is properly structured
        if (!activeLicense) {
          console.error('Invalid license format:', activeLicense);
          return false;
        }

        const response = await axios.post(`${baseUrl}/license/validate`, { license: activeLicense }, {
          withCredentials: true,
        });
        return response.data.isLicense;
      } catch (error: any) {
        console.error('Error validating license:', error.response ? error.response.data : error.message);
        return false;
      }
    };

    const checkConnection = async () => {
      try {
        if (!activeConfig) {
          console.error('Invalid database config:', activeConfig);
          return false;
        }
        const response = await axios.post(`${baseUrl}/connection/check`, activeConfig, {
          withCredentials: true,
        });
        return response.data.isConnected;
      } catch (error: any) {
        console.error('Error checking connection:', error.response ? error.response.data : error.message);
        return false;
      }
    };

    const windowRender = async () => {
      let isLicensed = false;
      let isConnected = false;

      if (activeLicense) {
        isLicensed = await checkLicense();
      }

      if (!isLicensed && activeConfig) {
        isConnected = await checkConnection();
      }

      if (isLicensed) {
        dispatch(setActivePage(Page.login));
      } else if (isConnected) {
        dispatch(setActivePage(Page.license));
      } else {
        dispatch(setActivePage(Page.databaseConfig));
      }
    };

    windowRender();
  }, [activeConfig, activeLicense, dispatch]);
};
