/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import { conn } from '../../config/database';
import { Int } from 'mssql';

export class Get {

  /**
   * Retrieves all records from a given Table.
   * @param {string} Table
   * @returns {Promise<Array>}
  */
   static recordsByTable = async (Table: string = ''): Promise<Array<any>> => {
    try {
      if (typeof Table !== 'string' || !Table) return Promise.reject(new Error('Table must be a string'));
      const pool:any = await conn();
      if (!pool)  return Promise.reject(new Error(`Connection failed`));
      const request = pool.request();
      const result = await request.query(`SELECT * FROM [${Table}]`);
      if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results.'));
      return result.recordset;
    } catch (error:any) {
      throw new Error(`Error fetching all records from ${Table}: ${error.message}`);
    } 
  }

  /**
   * Retrieves 1 specific record from a given Id & Table.
   * @param {number} Id
   * @param {string} Table
   * @returns {Promise<Array>}
  */
   static recordById = async (Id: number = 0, Table: string = ''): Promise<any | null> => {
    try {
        if (isNaN(Id) || typeof Id !== 'number') return Promise.reject( new Error('Id must be a valid number'));
        if (!Table || typeof Table !== 'string') return Promise.reject( new Error('Table name must be provided as a non-empty string'));
        if (Id < 1) return Promise.reject(new Error('Id must be a positive non-zero number'));
        const pool:any = await conn();
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

  /**
   * Retrieves specific record from a given fields.
   * @param {string}  Query
   * @param {Array}   Field
   * @param {Array}   Type
   * @param {Array}   Data
   * @returns {Promise<Array>}
  */
  static recordByFields = async (Query: string='', Field: Array<any> = [], Type: Array<any> = [], Data: Array<any> = []): Promise<Array<any>> => {
    try {
      if (!Query || typeof Query !== 'string') return Promise.reject(new Error('Query is empty'));
      if (!Field.every(field => field !== undefined)) {
        const undefinedIndex1:any = Field.findIndex((field, index) => field === undefined);
        return Promise.reject(new Error(`Field for field 'field${parseInt(undefinedIndex1, 10) +1}' is undefined`));
      }
      if (!Type.every((field: undefined) => field !== undefined)) {
        const undefinedIndex2:any = Type.findIndex((field: undefined, index: any) => field === undefined);
        return Promise.reject(new Error(`Type for field 'field${parseInt(undefinedIndex2, 10) +1}' is undefined`));
      }
      if (!Data.every(field => field !== undefined)) {
        const undefinedIndex3:any = Data.findIndex((field, index) => field === undefined);
        return Promise.reject(new Error(`Data for field 'field${parseInt(undefinedIndex3, 10) +1}' is undefined`));
      }
      if (Field.length !== Data.length || Field.length !== Type.length) return Promise.reject(new Error('Parameters are empty, or their lengths do not match'));
      const pool:any = await conn();
      if (!pool)  return Promise.reject(new Error(`Connection failed`));
      pool.setMaxListeners(15);
      const request = pool.request();
      for (let i = 0; i < Field.length; i++) {
        if (Data[i] === undefined) return Promise.reject(new Error(`Data for field '${Field[i]}' is undefined`));
        request.input(Field[i], Type[i], Data[i]);
      }
      const result = await request.query(Query);
      if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results'));
      return result.recordset;
    } catch (error:any) {
      throw new Error(`Error function recordByFields : Internal Server Error`);
    } 
  }

  /**
   * Retrieves records from a given Id & Query.
   * @param {number} Id
   * @param {string} Query
   * @returns {Promise<Array>}
   */
   static recordByIdAndQuery = async (Id: number=0, Query: string=''): Promise<Array<any>> => {
    try {
      if (isNaN(Id) || typeof Id !== 'number') return Promise.reject( new Error('Id must be a valid number'));
      if (!Query || typeof Query !== 'string') return Promise.reject( new Error('Query must be provided as a non-empty string'));
      if (Id < 1) return Promise.reject(new Error('Id must be a positive non-zero number'));
      const pool:any = await conn(); 
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

  /**
   * Retrieves records from given query
   * @param {string} Query
   * @returns {Promise<Array>}
   */
   static recordByQuery = async (Query: string = ''): Promise<Array<any>> => {
    try {
      if (!Query || typeof Query !== 'string') return Promise.reject(new Error('Query must be provided as a non-empty string'));
      const pool:any = await conn(); 
      if (!pool) return Promise.reject(new Error('Connection failed'));
      pool.setMaxListeners(15);
      const result = await  pool.request().query(Query);
      if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results'));
      return result.recordset || [];
    } catch (error:any) {
      throw new Error(`Error function recordByQuery: Internal Server Error`);
    } 
  }
}; // END CLASS