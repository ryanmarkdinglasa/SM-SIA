
import { Connection as conn } from '../../../config/database';
import {CONFIGURATION} from '../../config';

/**
 * Retrieves records from given query
 * @param {string} Query
 * @returns {Promise<Array>}
*/
export const recordByQuery = async (Query: string = ''): Promise<Array<any>> => {
    try {
        if (!Query || typeof Query !== 'string') return Promise.reject(new Error('Query must be provided as a non-empty string'));
        const pool:any = (await conn(CONFIGURATION)).pool;
        if (!pool) return Promise.reject(new Error('Connection failed'));
        pool.setMaxListeners(15);
        const result = await  pool.request().query(Query);
        if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results'));
        return result.recordset;
    } catch (error:any) {
        throw new Error(`Error function recordByQuery: Internal Server Error`);
    } 
}