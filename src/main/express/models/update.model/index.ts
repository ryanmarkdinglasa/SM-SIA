/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import { conn } from '../../config';
import sql, { Int } from 'mssql';

export class Update {

    /**
     * Edit one record
     * @param {number} Id - The Id of the record.
     * @param {string} Table - The name of the table.
     * @param {Array} Field - An array of field names.
     * @param {Array} Type - An array of SQL data types corresponding to the Field.
     * @param {Array} Data - An array of data values corresponding to the Field.
     * @returns {Promise<boolean>} - Returns true if the record is successfully inserted.
    */
    static record = async (Id: number = 0, Table: string = '', Field: Array<any> = [], Type: Array<any> = [], Data: Array<any> = []): Promise<boolean> => {
      let flag = false;
      try {
        if (isNaN(Id) || typeof Id !== 'number') return Promise.reject( new Error('Id must be a valid number'));
        
        if (!Table || typeof Table !== 'string') return Promise.reject( new Error('Table name must be provided as a non-empty string'));
        
        if (Id < 1) return Promise.reject(new Error('Id must be a positive non-zero number'));
        
        if (Field.length !== Data.length || Field.length !== Type.length) return Promise.reject(new Error('Parameter is empty, or their lengths do not match'));
        
        if (Field.length === 0 || Data.length === 0 || Type.length === 0) return Promise.reject(new Error('Parameter is empty, or their lengths do not match'));

        if (!Field.every(field => field !== undefined)) {
          const undefinedIndex1:any = Field.findIndex((field:undefined, index) => field === undefined);
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
        
        const pool:any = await conn();
        if (!pool) return Promise.reject(new Error('Connection failed'));

        const request = pool.request();
        const setExpressions = Field.map((field, index) => `${field} = @${field}`).join(', ');
        Field.forEach((field, index) => {
          request.input(field, Type[index], Data[index]);
        });
        request.input('Id', Int, Id);

        const query = `UPDATE [dbo].[${Table}] SET ${setExpressions} WHERE Id = @Id`;
        const result = await request.query(query);
        if (result.rowsAffected[0] < 1) return Promise.reject(new Error('Database query returned no results')); 
        flag = true ;
      } catch (error:any) {
        throw new Error(`Error updating records, using record: ${error.message}`);
      } 
    return flag;
  }

  /**
   * Edit multiple records with specific conditions
   * @param {Array} ConditionField - An array of objects representing conditions for the WHERE clause. Each object should have keys: field, type, and value.
   * @param {string} Table - The name of the table.
   * @param {Array} Field - An array of field names to be updated.
   * @param {Array} Type - An array of SQL data types corresponding to the Field.
   * @param {Array} DataList - An array of arrays, each containing data values corresponding to the Field.
   * @returns {Promise<boolean>} - Returns true if the records are successfully updated.
  */
  static records = async (ConditionField: Array<any> = [], Table: string = '', Field: Array<any> = [], Type: Array<any> = [], DataList: Array<Array<any>> = []): Promise<boolean> => {
    let transaction: any, flag = false;
    try {
      if (!Array.isArray(ConditionField) || ConditionField.length === 0) return Promise.reject(new Error('ConditionField array is missing or empty.'));
      
      if (!Table || typeof Table !== 'string') return Promise.reject(new Error('Table name must be provided as a non-empty string.'));
      
      if (!Field.every(field => field !== undefined)) {
        const undefinedIndex1 = Field.findIndex((field, index) => field === undefined);
        return Promise.reject(new Error(`Data for field 'field${undefinedIndex1 + 1}' is undefined`));
      }
      if (!Type.every(type => type !== undefined)) {
        const undefinedIndex2 = Type.findIndex((type, index) => type === undefined);
        return Promise.reject(new Error(`Type for field 'field${undefinedIndex2 + 1}' is undefined`));
      }
      if (DataList.some((data:any) => data.some((field: undefined) => field === undefined))) {
        const undefinedIndex = DataList.findIndex((data:any) => data.some((field: undefined) => field === undefined));
        const undefinedFieldIndex = DataList[undefinedIndex].findIndex((field: undefined) => field === undefined);
        return Promise.reject(new Error(`Data for field '${Field[undefinedFieldIndex]}' in record ${undefinedIndex + 1} is undefined`));
      }
      if (!Array.isArray(Field) || !Array.isArray(Type) || !Array.isArray(DataList) || Field.length !== Type.length || Field.length !== DataList[0].length) {
        return Promise.reject(new Error('Parameters are not arrays or have different lengths.'));
      }

      const pool: any = await conn();
      if (!pool) return Promise.reject(new Error('Connection failed'));

      pool.setMaxListeners(15);
      transaction = new sql.Transaction(pool);
      await transaction.begin();

      const batchSize = 15;
      for (let i = 0; i < DataList.length; i += batchSize) {
        const batch = DataList.slice(i, i + batchSize);
        for (const item of batch) {
          const request = new sql.Request(transaction);
          const setExpressions = Field.map((field, index) => `${field} = @${field}${index}`).join(', ');
          const whereConditions = ConditionField.map((condition, index) => `${condition.field} = @condition${index}`).join(' AND ');
          const updateQuery = `UPDATE [dbo].[${Table}] SET ${setExpressions} WHERE ${whereConditions}`;
          
          Field.forEach((field, index) => {
            request.input(`${field}${index}`, Type[index], item[index]);
          });

          ConditionField.forEach((condition, index) => {
            request.input(`condition${index}`, condition.type, condition.value);
          });
          
          const result = await request.query(updateQuery);
          if (result.rowsAffected[0] === 0) {
            return Promise.reject(new Error('Database query returned no results'));
          }
        }
      }
      await transaction.commit();
      flag = true;
    } catch (error: any) {
      if (transaction) { await transaction.rollback(); }
      throw new Error(`Error updating records, using records: ${error.message}`);
    }
    return flag;
  }

    /**
     * Update multiple records based on an array of IDs.
     * @param {Array} Ids - An array of record IDs to update.
     * @param {string} Table - The name of the table.
     * @param {Array} Field
     * @param {Array} Type 
     * @param {Array} Data
     * @returns {Promise<Boolean>}
    */
    static recordByIds = async (Ids: Array<number> = [], Table: string = '', Field: Array<any> = [], Type: Array<any> = [], DataList: Array<Array<any>> = []): Promise<boolean> => {
      let transaction: any, flag = false;
      try {
        if (!Array.isArray(Ids) || Ids.length === 0) {
          throw new Error('Ids array is missing or empty.');
        }
  
        if (!Table || typeof Table !== 'string') {
          throw new Error('Table name must be provided as a non-empty string.');
        }
  
        if (!Field.every(field => field !== undefined)) {
          const undefinedIndex1 = Field.findIndex((field, index) => field === undefined);
          throw new Error(`Data for field 'field${undefinedIndex1 + 1}' is undefined`);
        }
  
        if (!Type.every(type => type !== undefined)) {
          const undefinedIndex2 = Type.findIndex((type, index) => type === undefined);
          throw new Error(`Type for field 'field${undefinedIndex2 + 1}' is undefined`);
        }
  
        if (DataList.some((data: any) => data.some((field: undefined) => field === undefined))) {
          const undefinedIndex = DataList.findIndex((data: any) => data.some((field: undefined) => field === undefined));
          const undefinedFieldIndex = DataList[undefinedIndex].findIndex((field: undefined) => field === undefined);
          throw new Error(`Data for field '${Field[undefinedFieldIndex]}' in record ${undefinedIndex + 1} is undefined`);
        }
  
        if (!Array.isArray(Field) || !Array.isArray(Type) || !Array.isArray(DataList) || Field.length !== Type.length || Field.length !== DataList[0].length) {
          throw new Error('Parameters are not arrays or have different lengths.');
        }
  
        const pool: any = await conn();
        if (!pool) {
          throw new Error('Connection failed');
        }
  
        pool.setMaxListeners(15);
        transaction = new sql.Transaction(pool);
        await transaction.begin();
  
        const batchSize = 15;
        for (let i = 0; i < Ids.length; i += batchSize) {
          const batchIds = Ids.slice(i, i + batchSize);
          const batchData = DataList.slice(i, i + batchSize);
          const request = new sql.Request(transaction);
  
          const setExpressions = Field.map((field, index) => `${field} = @${field}${i + index}`).join(', ');
  
          batchIds.forEach((id, index) => {
            request.input(`Id${index}`, sql.Int, id);
          });
  
          batchData.forEach((data, batchIndex) => {
            Field.forEach((field, fieldIndex) => {
              request.input(`${field}${batchIndex}`, Type[fieldIndex], data[fieldIndex]);
            });
          });
  
          const idParams = batchIds.map((_, index) => `@Id${index}`).join(', ');
          const updateQuery = `UPDATE ${Table} SET ${setExpressions} WHERE Id IN (${idParams})`;
  
          const result = await request.query(updateQuery);
          if (result.rowsAffected[0] === 0) {
            throw new Error('Database query returned no results');
          }
        }
        await transaction.commit();
        flag = true;
      } catch (error: any) {
        if (transaction) {
          await transaction.rollback();
        }
        throw new Error(`Error updating records, using records: ${error.message}`);
      }
  
      return flag;
    }
}; // END CLASS

/*
// Usage example
(async () => {
  try {
    const record = await UPDATE.record(1, 'AccessRight', ['Name'], [NVarChar(50)], ['Test])
    const records = await UPDATE.record([{ field: 'Name', type: NVarChar(50) , data: 'Testing' }, {field: 'Description', type: NVarChar(255) , data: 'Testing'}], 'AccessRight', ['Name'], [NVarChar(50)], ['Test'])
    const recordByIds = await UPDATE.recordByIds([1, 2, 3], 'AccessRight', ['Name'], [sql.NVarChar(50)], [['test1'], ['test2'], ['test3']]);
  } catch (error) {
    console.error(error);
  }
})();*/