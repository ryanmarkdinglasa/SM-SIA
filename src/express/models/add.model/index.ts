/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : ALL FUNCTIONS SHOULD HAVE TEST CASE
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-28 03:48PM
*/

import { conn } from '../../config';
import { Transaction, Request} from 'mssql';

export class Add {
  /**
   * Insert one record
   * @param {string} Table - The name of the table.
   * @param {Array} Field - An array of field names.
   * @param {Array} Type - An array of SQL data types corresponding to the fields.
   * @param {Array} Data - An array of data values corresponding to the fields.
   * @returns {Promise<boolean>} - Returns true if the record is successfully inserted.
  */
  static record = async (Table: string = '', Field: Array<any> = [], Type: Array<any> = [], Data: Array<any> = []): Promise<boolean> => {
    let flag = false;
    try {
      if (!Table || typeof Table !== 'string') return Promise.reject(new Error('Table name field is missing.'));

      if (!Field.every(field => field !== undefined)) {
        const undefinedIndex1:any = Field.findIndex((field, index) => field === undefined);
        return Promise.reject(new Error(`Data for field 'field${parseInt(undefinedIndex1, 10) +1}' is undefined`));
      }

      if (!Type.every((field: undefined) => field !== undefined)) {
        const undefinedIndex2:any = Type.findIndex((field: undefined, index: any) => field === undefined);
        return Promise.reject(new Error(`Data for field 'field${parseInt(undefinedIndex2, 10) +1}' is undefined`));
      }

      if (!Data.every(field => field !== undefined)) {
        const undefinedIndex3:any = Data.findIndex((field, index) => field === undefined);
        return Promise.reject(new Error(`Data for field 'field${parseInt(undefinedIndex3, 10) +1}' is undefined`));
      }

      if (!Field || !Data || !Type || Field.length !== Data.length || Field.length !== Type.length) return Promise.reject(new Error('Parameter is empty, or their lengths do not match'));

      const pool:any = await conn();
      if (!pool) return Promise.reject(new Error('Connection failed'));
      const request = pool.request();

      const fieldNames = Field.join(', ');
      const fieldParams = Field.map(field => `@${field}`).join(', ');

      const query = `INSERT INTO [dbo].[${Table}](${fieldNames}) VALUES (${fieldParams})`;
      Field.forEach((field, index) => {
        if (Data[index] === undefined) return Promise.reject(new Error(`Data for field '${field}' is undefined`));
        request.input(field, Type[index], Data[index]);
      });

      const result = await request.query(query);
      if (result.rowsAffected[0] < 0) return Promise.reject(new Error('Database query returned no results'));
      flag = true;

    } catch (error: any) {
      throw new Error(`Error in Add.record: ${error.message}`);
    }
    return flag;
  } // END FUNCTION
  
  /**
   * Insert multiple records in bulk
   * @param {string} Table - The name of the table.
   * @param {Array} Field - An array of field names.
   * @param {Array} Type - An array of SQL data types corresponding to the fields.
   * @param {Array} dataList - An array of data values corresponding to the fields.
   * @returns {Promise<boolean>} - Returns true if the records are successfully inserted.
  */
  static records = async (Table: string = '', Field: Array<any> = [], Type: Array<any> = [], dataList: Array<any> = []): Promise<boolean> => {
    let transaction, flag = false;
    try {
        if (!Table || typeof Table !== 'string') return Promise.reject(new Error('Table name field is missing.'));

        if (!Field.every(field => field !== undefined)) return Promise.reject(new Error('Field array contains undefined values.'));

        if (!Type.every(field => field !== undefined)) return Promise.reject(new Error('Type array contains undefined values.'));

        if (dataList.some(data => data.some((field: undefined) => field === undefined))) {
            const undefinedIndex = dataList.findIndex(data => data.some((field: undefined) => field === undefined));
            const undefinedFieldIndex = dataList[undefinedIndex].findIndex((field: undefined) => field === undefined);
            return Promise.reject(new Error(`Data for field '${Field[undefinedFieldIndex]}' in record ${undefinedIndex + 1} is undefined`));
        }

        if (!dataList.every(data => data.length === Type.length)) return Promise.reject(new Error('Length of data arrays does not match the length of the Type array.'));

        if (!Field.length || !dataList.length || !Type.length || Field.length !== Type.length) return Promise.reject(new Error('Parameter is empty, or their lengths do not match'));

        const pool: any = await conn();
        if (!pool) return Promise.reject(new Error('Connection failed'));
        pool.setMaxListeners(15);
        
        transaction = new Transaction(pool);
        await transaction.begin();

        const batchSize = 15;
        for (let i = 0; i < dataList.length; i += batchSize) {
            const batch = dataList.slice(i, i + batchSize);
            const request = new Request(transaction);
            const query_fields = Field.join(', ');
            const query_values = batch.map((_, rowIndex) => `(${Field.map((field, fieldIndex) => `@${field}${rowIndex}${fieldIndex}`).join(', ')})`).join(', ');
            const query = `INSERT INTO [dbo].[${Table}] (${query_fields}) VALUES ${query_values}`;
            batch.forEach((data, rowIndex) => {
                Field.forEach((field, fieldIndex) => {
                    request.input(`${field}${rowIndex}${fieldIndex}`, Type[fieldIndex], data[fieldIndex]);
                });
            });
            await request.query(query);
        }
        await transaction.commit();
        flag = true;
    } catch (error: any) {
        if (transaction) await transaction.rollback();
        throw new Error(`Error in Add.records: ${error.message}`);
    }
    return flag;
  }
}; // END CLASS