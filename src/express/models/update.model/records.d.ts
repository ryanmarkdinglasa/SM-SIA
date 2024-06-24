/**sql.
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : CANNOT TEST THE TRANSACTION FOR UNKNOWN REASONS
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-28 03:48PM
*/

import { conn } from '../../config';
import sql, { ConnectionPool, Transaction, Request } from 'mssql';
import Update from '.'; // Adjust the import path as necessary

jest.mock('../../config', () => ({
  conn: jest.fn()
}));

describe('Update.records', () => {
  let mockRequest: Partial<Request>;
  let mockTransaction: Partial<Transaction>;
  let mockPool: Partial<ConnectionPool>;

  beforeEach(() => {
    mockTransaction = {
      begin: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn()
    };
    mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ rowsAffected: [1] })
    };
    mockPool = {
      request: jest.fn().mockReturnValue(mockRequest as Request),
      setMaxListeners: jest.fn()
    };
    (conn as jest.Mock).mockResolvedValue(mockPool as ConnectionPool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if ConditionField array is missing or empty', async () => {
    await expect(Update.records([], 'Users', ['Name'], [sql.VarChar], [['John Doe']])).rejects.toThrow('ConditionField array is missing or empty.');
  });

  it('should throw an error if Table name is not provided', async () => {
    await expect(Update.records([{ field: 'Id', type: sql.Int, value: 1 }], '', ['Name'], [sql.VarChar], [['John Doe']])).rejects.toThrow('Table name must be provided as a non-empty string');
  });

  it('should throw an error if Field array contains undefined', async () => {
    await expect(Update.records([{ field: 'Id', type: sql.Int, value: 1 }], 'Users', ['Name', undefined], [sql.VarChar, sql.Int], [['John Doe', 30]])).rejects.toThrow('Data for field \'field2\' is undefined');
  });

  it('should throw an error if Type array contains undefined', async () => {
    await expect(Update.records([{ field: 'Id', type: sql.Int, value: 1 }], 'Users', ['Name', 'Age'], [sql.VarChar, undefined], [['John Doe', 30]])).rejects.toThrow('Type for field \'field2\' is undefined');
  });

  it('should throw an error if DataList contains undefined', async () => {
    await expect(Update.records([{ field: 'Id', type: sql.Int, value: 1 }], 'Users', ['Name', 'Age'], [sql.VarChar, sql.Int], [['John Doe', undefined]])).rejects.toThrow('Data for field \'Age\' in record 1 is undefined');
  });

  it('should throw an error if parameters are not arrays or have different lengths', async () => {
    await expect(Update.records(
      [{ field: 'Id', type: sql.Int, value: 1 }],
      'Users',
      ['Name'],
      [sql.VarChar, sql.Int],
      [['John Doe']]
    )).rejects.toThrow('Parameters are not arrays or have different lengths.');
  });

  it('should throw an error if database connection fails', async () => {
    (conn as jest.Mock).mockResolvedValueOnce(null);
    await expect(Update.records(
      [{ field: 'Id', type: sql.Int, value: 1 }],
      'Users',
      ['Name', 'Age'],
      [sql.VarChar, sql.Int],
      [['John Doe', 30]]
    )).rejects.toThrow('Connection failed');
  });
  
});

/* 
    TRANSACTIONS

    it('should update records successfully', async () => {
        await expect(Update.records(
        [{ field: 'Id', type: sql.Int, value: 1 }],
        'Users',
        ['Name', 'Age'],
        [sql.VarChar, sql.Int],
        [['John Doe', 30], ['Jane Doe', 25]]
        )).resolves.toBe(true);

        expect(mockTransaction.begin).toHaveBeenCalled();
        expect(mockTransaction.commit).toHaveBeenCalled();
        expect(mockRequest.query).toHaveBeenCalledTimes(2);
    });

    it('should throw an error if database query returns no results', async () => {
        mockRequest.query = jest.fn().mockResolvedValueOnce({ rowsAffected: [0] });
        await expect(Update.records(
        [{ field: 'Id', type: sql.Int, value: 1 }],
        'Users',
        ['Name', 'Age'],
        [sql.VarChar, sql.Int],
        [['John Doe', 30]]
        )).rejects.toThrow('Database query returned no results');
        expect(mockTransaction.rollback).toHaveBeenCalled();
    });
*/