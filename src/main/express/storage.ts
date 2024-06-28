import storage from 'node-persist';
  
// Initialize node-persist
export async function initializeStorage() {
    await storage.init({
        dir: './storage', // Specify the directory where data will be stored
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: 'utf8',
        logging: false,
        ttl: false,
    });
    console.log('Node-persist initialized');
};
