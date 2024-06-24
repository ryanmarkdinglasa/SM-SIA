import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getActiveDatabaseConfig } from '../selectors';
import { baseUrl } from '../routes';

export const useIsConnected = () => {
  const activeConfig = useSelector(getActiveDatabaseConfig);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkIsConnected = async () => {
      try {
        const response = await axios.post(`${baseUrl}/connection/check`, activeConfig, {
          withCredentials: true,
        });
        setIsConnected(response.data.isConnected);
      } catch (error) {
        console.error('Error checking connection:', error);
        setIsConnected(false); 
      }
    };

    checkIsConnected();
  }, [activeConfig]);

  return isConnected;
};
