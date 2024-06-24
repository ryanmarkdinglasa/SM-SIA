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
          pool.setMaxListeners(15); // Example: Adjust as per your application's needs
  
          // Check the database connection by executing a simple query
          const result = await pool.request().query('SELECT 1 AS Result');
  
          // Check if the query returned a result
          const isConnected = result.recordset.length > 0;
  
          return { pool, isConnected };
      } catch (error:any) {
          throw new Error(`Database connection error: ${error.message}`);
      }
  };

/*

// Database configuration
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

// IIFE to test the connection
(async () => {
    try {
        const connection = await Connection(config);
        if (connection.isConnected) {
            console.log('Connected');
        } else {
            console.log('Not Connected');
        }
    } catch (error) {
        console.error(`Disconnected Error: ${error}`);
    }
})();
*/