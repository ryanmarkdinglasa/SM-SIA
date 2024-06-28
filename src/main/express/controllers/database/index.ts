import { Connection, Config } from '../../config';
import { CustomRequest, CONFIG } from '../../shared';
import storage from 'node-persist';

export const DBConnection = async (req: CustomRequest, res: any): Promise<any> => {
    try {
        const conf = req.body;
        if (!conf) {
            return res.status(400).json({ isConnected: false, message: 'Configuration is null or undefined' });
        }

        const config: Config = {
            user: conf.user,
            password: conf.password,
            server: conf.server,
            database: conf.name,
            options: {
                trustedConnection: true,
                encrypt: false,
                instanceName: 'MSSQLSERVER',
                trustServerCertificate: true // Only include this if using MSSQL Server 2019/2022
            },
            port: conf.port
        };

        const result = await Connection(config);
        if (!result.isConnected) {
            return res.status(400).json({ isConnected: false, message: 'Database connection error' });
        }
        
        return res.status(200).json({ isConnected: true, message: 'Database connected' });
    } catch (error: any) {
        return res.status(500).json({ isConnected: false, message: `Database connection error: ${error.message}` });
    }
};

export const setConnection = async (req: CustomRequest, res: any): Promise<any> => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({ message: 'Database configuration not found' });
        const config: Config = {
            user: data.user,
            password: data.password,
            server: data.server,
            database: data.name,
            options: {
                trustedConnection: true,
                encrypt: false,
                instanceName: 'MSSQLSERVER',
                trustServerCertificate: true // Only include this if using MSSQL Server 2019/2022
            },
            port: data.port
        };
        await storage.setItem(CONFIG, { config });
        return res.status(200).json({ set:true, message: `Connection setted` });
    } catch (error: any) {
        return res.status(500).json({ set:false, message: `Database connection error: ${error.message}` });
    }
};
export const getConnection = async (_req: CustomRequest, res: any): Promise<any> => {
    try {
        const config = await storage.getItem(CONFIG);
        if (!config) return res.status(400).json({ message: 'Database configuration not found in session' });
        return res.status(200).json({ config });
    } catch (error: any) {
        return res.status(500).json({ message: `Database connection error: ${error.message}` });
    }
};

export const clearStorage = async (_req: CustomRequest, res: any): Promise<any> => {
    try {
        await storage.clear(); 
        return res.status(200).json({ message: `Storage is cleared` });
    } catch (error: any) {
        return res.status(500).json({ message: `Clearing Storage Error: ${error.message}` });
    }
}