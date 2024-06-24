import sql, {ConnectionPool} from 'mssql';

// Database configuration
export const config: sql.config = {
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

export interface DatabaseConnection {
    pool: ConnectionPool;
    isConnected: boolean;
}

export const Connection = async (): Promise<DatabaseConnection> => {
    try {
        const pool = await new sql.ConnectionPool(config).connect();
        pool.setMaxListeners(15);
        // Check the database connection by executing a simple query
        const result = await pool.query`SELECT 1 AS Result`;
        // Check if the query returned a result
        const isConnected = result.recordset.length > 0;
        return { pool, isConnected };
    } catch (error) {
        throw new Error(`Database connection error: ${error}`);
    }
};

/*
// IIFE to test the connection
(async () => {
    try {
        const connection = await conn();
        if (connection) {
            console.log('Connected');
        } else {
            console.log('Not Connected');
        }
    } catch (error) {
        console.error(`Disconnected Error: ${error}`);
    }
})();
*/