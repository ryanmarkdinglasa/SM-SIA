import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getActiveDatabaseConfig } from '../selectors';
import { ConnectionPool } from 'mssql';

export const useIsConnected = (): boolean => {
  const activeDBConfig:any = useSelector(getActiveDatabaseConfig);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const config = {
    user: activeDBConfig.user,
    password: activeDBConfig.password,
    database: activeDBConfig.name,
    server: activeDBConfig.server,
    port: activeDBConfig.port,
    options: {
      trustedConnection: true,
      encrypt: false,
      instanceName: "MSSQLSERVER"
    }
  }
  useEffect(() => {
    const poolPromise = new ConnectionPool(config)
      .connect()
      .then(pool => {
        console.log('Connected to MSSQL');
        setIsConnected(true);
        return pool;
      })
      .catch(err => {
        console.error('Database Connection Failed! Bad Config: ', err);
        setIsConnected(false);
      });

    // Cleanup function to disconnect the pool if component unmounts or config changes
    return () => {
      poolPromise
        .then(pool => pool)
        .catch(err => console.error('Error closing the connection pool:', err));
    };
  }, [activeDBConfig]);

  return isConnected;
};
