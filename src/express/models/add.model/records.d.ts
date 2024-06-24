/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : ALL TEST CASES, PASS
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-28 03:48PM
*/

import Add from '.';
import poolPromise, { conn } from '../../config/database';
import sql from 'mssql';

describe('Add.records', () => {
  beforeAll(async () => {
    await poolPromise;
  });

  afterEach(async () => {
    const pool:any = await conn();
    await pool.request().query('DELETE FROM [dbo].[AuditTrail]');
  });
  
  it('should insert multiple records into the database', async () => {
    const Table = 'AuditTrail';
    const Fields = [ 'UserId', 'Action', 'Record', 'RecordTable', 'DateCreated' ];
    const Types = [ sql.Int, sql.NVarChar(50), sql.Int, sql.NVarChar(50), sql.DateTime ];
    const dataList:any = [ 
      [1, 'test-action1',1, 'test-table1', "2024-05-03"],
      [1, 'test-action2',1, 'test-table2', "2024-05-03"],
      [1, 'test-action3',1, 'test-table3', "2024-05-03"],
    ];
    
    const result = await Add.records(Table, Fields, Types, dataList);
    expect(result).toBe(true);
    const pool:any = await conn();
    const queryResult = await pool.request().query(`SELECT * FROM ${Table}`);
    expect(queryResult.recordset.length).toBe(dataList.length);
  });
  it('should fail if table name is missing', async () => {
    const Fields = ['field1', 'field2', 'field3'];
    const Types = [sql.VarChar, sql.Int, sql.DateTime];
    const dataList = [['testData1', 123, new Date()]];
    await expect(Add.records('', Fields, Types, dataList)).rejects.toThrow('Table name field is missing.');
  });

  it('should fail if table name is missing', async () => {
    const Fields = ['field1', 'field2', 'field3'];
    const Types = [sql.VarChar, sql.Int, sql.DateTime];
    const dataList = [['testData1', 123, new Date()]]
    await expect(Add.records('', Fields, Types, dataList)).rejects.toThrow('Table name field is missing.');
  });

  it('should fail if any field data is undefined', async () => {
    const Table = 'AuditTrail';
    const Fields = ['field1', 'field2', 'field3'];
    const Types = [sql.VarChar, sql.Int, sql.DateTime];
    const dataList = [
      ['testData1', 123, undefined],
      ['testData2', 456, new Date()]
    ];

    await expect(Add.records(Table, Fields, Types, dataList)).rejects.toThrow("Data for field 'field3' in record 1 is undefined");
  });

  it('should fail if parameter lengths do not match', async () => {
    const Table = 'AuditTrail';
    const Fields = ['field1', 'field2', 'field3'];
    const Types = [sql.VarChar, sql.Int];
    const dataList = [['testData1', 123]]; // Only two fields provided

    await expect(Add.records(Table, Fields, Types, dataList)).rejects.toThrow('Parameter is empty, or their lengths do not match');
  });

});