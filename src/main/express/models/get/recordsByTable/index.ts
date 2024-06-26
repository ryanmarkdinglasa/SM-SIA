import { Connection as conn } from '../../../config/database';
//import Store from 'electron-store';
//import { DATABSE_CONFIGURATION } from '../../../../../apps/DatabaseManager/types'
/**
 * Retrieves all records from a given Table.
 * @param {string} Table
 * @returns {Promise<Array>}
*/
//const store = new Store();
export const  recordsByTable = async (Table: string = ''): Promise<Array<any>> => {
    try {
        if (typeof Table !== 'string' || !Table) return Promise.reject(new Error('Table must be a string'));
        const config: any = {}//store.get(DATABSE_CONFIGURATION);
        //console.log(config.JSON.stringify());
        const pool:any = await conn(config);
        if (!pool)  return Promise.reject(new Error(`Connection failed`));
        const request = pool.request();
        const result = await request.query(`SELECT * FROM [${Table}]`);
        if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results.'));
        return result.recordset;
    } catch (error:any) {
        throw new Error(`Error fetching all records from ${Table}: ${error.message}`);
    } 
};