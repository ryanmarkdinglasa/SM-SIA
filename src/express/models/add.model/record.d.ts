
/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : ALL TEST CASES, PASS
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-28 03:48PM
*/

import Add from '.';
import poolPromise, {conn} from '../../config/database';
import sql, {ConnectionPool, Request} from 'mssql';

describe('Add.record', () => {
  beforeAll(async () => {
    await poolPromise; // Ensure the database connection is established before running tests
  });

  afterEach(async () => {
    // Clean up inserted records after each test
    const pool:any = await conn();
    await pool.request().query('DELETE FROM [dbo].[AuditTrail]');
  });
  
  const fields = [ 'UserId', 'Action', 'Record', 'RecordTable', 'DateCreated' ];
  const types = [ sql.Int, sql.NVarChar(50), sql.Int, sql.NVarChar(50), sql.DateTime ];
  const data = [ 1, 'test-action',1, 'test-table', "2024-05-03"];

  it('should insert a record into the database', async () => {
    const table = 'AuditTrail'; // Replace with your table name
    const result = await Add.record(table, fields, types, data);
    expect(result).toBe(true);
  });

  it('should fail if table name is missing', async () => {
    await expect(Add.record('', fields, types, data)).rejects.toThrow('Table name field is missing.');
  });

  it('should fail if parameter lengths do not match', async () => {
    const mismatchedFields = ['field1', 'field2'];
    const mismatchedTypes = [sql.VarChar, sql.Int];
    const mismatchedData = ['testData'];
    await expect(Add.record('YourTableName', mismatchedFields, mismatchedTypes, mismatchedData))
      .rejects.toThrow('Parameter is empty, or their lengths do not match');
  });

  it('should fail if data for any field is undefined', async () => {
    const incompleteData = ['testData', 123, undefined];
    await expect(Add.record('YourTableName', fields, types, incompleteData))
      .rejects.toThrow("Data for field 'field3' is undefined");
  });

});
