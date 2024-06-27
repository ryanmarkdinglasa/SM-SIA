import { Connection as conn } from '../../../config/database';
import { Int } from 'mssql';
import {CONFIGURATION} from '../../config';
/**
 * Retrieves records from a given Id & Query.
 * @param {number} Id
 * @param {string} Query
 * @returns {Promise<Array>}
*/
export const recordByIdAndQuery = async (Id: number=0, Query: string=''): Promise<Array<any>> => {
    try {
        if (isNaN(Id) || typeof Id !== 'number') return Promise.reject( new Error('Id must be a valid number'));
        if (!Query || typeof Query !== 'string') return Promise.reject( new Error('Query must be provided as a non-empty string'));
        if (Id < 1) return Promise.reject(new Error('Id must be a positive non-zero number'));
        const pool:any = (await conn(CONFIGURATION)).pool;
        if (!pool) return Promise.reject(new Error('Connection failed'));
        pool.setMaxListeners(15);
        const request = pool.request();
        request.input('Id', Int, Id);
        const result = await request.query(Query);
        if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results'));
        return result.recordset;
    } catch (error) {
        throw new Error(`Error function recordByIdAndQuery: Internal Server Error`);
    }
}
