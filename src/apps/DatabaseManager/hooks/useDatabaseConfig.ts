import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getActiveDatabaseConfig } from '../selectors';
import axios from 'axios';
import { baseUrl } from '../routes';

export const useDatabaseConfig = () => {
  const config = useSelector(getActiveDatabaseConfig);

  useEffect(() => {
    const loadConnection = async () => {
        try {
          const response = await axios.get(`${baseUrl}/connection/config`);
          if (response.data) {
            console.log('Database Connected');
          } else {
            console.error('Database Not Connected');
          }
        } catch (error) {
          console.error('Error checking database connection:', error);
        }
    };
    loadConnection();
  }, [config]);
};
