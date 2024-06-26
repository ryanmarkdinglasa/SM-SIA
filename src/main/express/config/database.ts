import { ConnectionPool, config as MSSQLConfig } from 'mssql';

export interface Config extends MSSQLConfig {
    user: string;
    password: string;
    server: string;
    database: string;
    options: {
        trustedConnection: boolean;
        encrypt: boolean;
        instanceName?: string; // instanceName is optional, use '?' to denote optional properties
        trustServerCertificate?:boolean;
    };
    port?: number; // port is optional, use '?' to denote optional properties
}
  
export interface DatabaseConnection {
    pool: ConnectionPool;
    isConnected: boolean;
}

  export const Connection = async (config: Config): Promise<DatabaseConnection> => {
      try {
        const pool = await new ConnectionPool(config).connect();
        pool.setMaxListeners(15);
        const result = await pool.request().query('SELECT 1 AS Result');
        const isConnected = result.recordset.length > 0;
        return { pool, isConnected };
      } catch (error:any) {
          throw new Error(`Database connection error: ${error.message}`);
      }
  };
  /*
  export const Connected = async (): Promise<any> => {
    try {
        const store = new ElectronStore();
        const data: any = store.get('database-configuration');
        const conf: Config = {
            user: `${data.user}`,
            password: `${data.password}`,
            server: `${data.server}`,
            database: `${data.database}`,
            options: {
                trustedConnection: false,
                encrypt: false,
            },
            port:parseInt(data.port),
        }
        return [conf];
      const pool = await new ConnectionPool(conf).connect();
      pool.setMaxListeners(15);
      const result = await pool.request().query('SELECT 1 AS Result');
      const isConnected = result.recordset.length > 0;
      return { pool, isConnected };
    } catch (error:any) {
        throw new Error(`Database connection error: ${error.message}`);
    }
};*/

// Database configuration
/*
export const config: Config = {
    user: 'sa',
    password: 'innosoft',
    server: 'localhost',
    database: 'pos13',
    options: {
      trustedConnection: true,
      encrypt: false,
      instanceName: "MSSQLSERVER"
    },
    port: 1433, // make sure to change port
  };
*/
// IIFE to test the connection
/*
(async () => {
    try {
        const store = new ElectronStore();
        const data = store.get('database-configuration');
        //
        console.log('config/database');
        console.log(data);
    } catch (error) {
        console.error(`Disconnected Error: ${error}`);
    }
})();
*/