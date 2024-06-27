import electronStore from 'electron-store';

const store = new electronStore();
let data: any = store.get('database-configuration');

if(!data || data === null || data === undefined){ //set to default
    data = {
        user:'sa',
        password: 'innosoft',
        server: 'localhost',
        database: 'pos13',
        port: 1433
    }
}

export const CONFIGURATION = {
    user: data.user,
    password: data.password,
    server: data.server,
    database: data.name,
    options: {
        trustedConnection: true,
        encrypt: false,
        trustServerCertificate: true, // added trustServerCertificate based on the previous code
    },
    port: parseInt(data.port, 10), 
}