
import { Connection, Config } from '../../config';

export const DBConnection = async (req: any, res: any) => {
    try {
        const conf = req.body;
        if (!conf) return res.status(400).json({ isConnected: false, message: `config is null or undefined`});
        const config: Config = {
            user: conf.user,
            password: conf.password,
            server: conf.server,
            database:conf.name,
            options: {
                trustedConnection: true,
                encrypt: false,
                instanceName: 'MSSQLSERVER',
            },
            port: conf.port
        }
        const result = await Connection(config);
        if (!result.isConnected) return res.status(400).json({ isConnect: false, message: `Database Connection Error`});
        return res.status(200).json({ isConnected: true, message: `Database Connected`});
    } catch (error) {
        return res.status(500).json({ isConnected: false, message: `Database Connection Error: ${error}`});
    }
};