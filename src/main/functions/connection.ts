//import Store from 'electron-store';
import { ConnectionPool } from 'mssql';

export interface DatabaseConnection {
    pool: ConnectionPool;
    isConnected: boolean;
}

export const Connection = async (conf:any): Promise<DatabaseConnection> => {
    try {
        const mssql = require('mssql');
        const config = {
            user: String(conf.user),
            password: String(conf.password),
            server: String(conf.server),
            database: String(conf.name),
            port: parseInt(conf.port, 10),
            options: { encrypt: false }
        };
        
        const pool = await new mssql.ConnectionPool(config).connect();
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