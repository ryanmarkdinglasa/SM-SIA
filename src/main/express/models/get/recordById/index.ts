import { Connection as conn } from '../../../config/database';
import { Int } from 'mssql';
import {CONFIGURATION} from '../../config';
/**
 * Retrieves 1 specific record from a given Id & Table.
 * @param {number} Id
 * @param {string} Table
 * @returns {Promise<Array>}
*/
export const recordById = async (Id: number = 0, Table: string = ''): Promise<any | null> => {
    try {
        if (isNaN(Id) || typeof Id !== 'number') return Promise.reject( new Error('Id must be a valid number'));
        if (!Table || typeof Table !== 'string') return Promise.reject( new Error('Table name must be provided as a non-empty string'));
        if (Id < 1) return Promise.reject(new Error('Id must be a positive non-zero number'));
        const pool:any = (await conn(CONFIGURATION)).pool;
        if (!pool)  return Promise.reject(new Error(`Connection failed`));
        const request = pool.request();
        request.input('Id', Int, Id);
        const result = await request.query(`SELECT * FROM [${Table}] WHERE [Id] = @Id`);
        if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results'));
        return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error:any) {
        throw new Error(`Error fetching record from ${Table}: ${error.message}`);
    }
}