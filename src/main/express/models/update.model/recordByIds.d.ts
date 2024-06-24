/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : ALL TEST CASES, PASS
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-28 03:48PM
*/

import   sql  from 'mssql';
import { conn } from '../../config'; // Adjust the import path as necessary
import Update from '.'; // Adjust the import path as necessary

jest.mock('../../config', () => ({
  conn: jest.fn(),
}));

describe('Update.recordByIds', () => {
  let mockTransaction: Partial<sql.Transaction>;
  let mockRequest: Partial<sql.Request>;
  let mockPool: Partial<sql.ConnectionPool>;

  beforeEach(() => {
    mockTransaction = {
      begin: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
    };
    mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ rowsAffected: [1] }),
    };
    mockPool = {
      request: jest.fn().mockReturnValue(mockRequest as sql.Request),
      setMaxListeners: jest.fn(),
      transaction: jest.fn().mockReturnValue(mockTransaction as sql.Transaction),
    };
    (conn as jest.Mock).mockResolvedValue(mockPool as sql.ConnectionPool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if Ids array is missing or empty', async () => {
    await expect(Update.recordByIds([], 'Users', ['Name'], [sql.NVarChar], [['Alice']])).rejects.toThrow(
      'Ids array is missing or empty.'
    );
  });

  it('should throw an error if Table name is not a string or empty', async () => {
    await expect(Update.recordByIds([1], '', ['Name'], [sql.NVarChar], [['Alice']])).rejects.toThrow(
      'Table name must be provided as a non-empty string.'
    );
  });

  it('should throw an error if any field in Field array is undefined', async () => {
    await expect(Update.recordByIds([1], 'Users', [undefined], [sql.NVarChar], [['Alice']])).rejects.toThrow(
      "Data for field 'field1' is undefined"
    );
  });

  it('should throw an error if any type in Type array is undefined', async () => {
    await expect(Update.recordByIds([1], 'Users', ['Name'], [undefined], [['Alice']])).rejects.toThrow(
      "Type for field 'field1' is undefined"
    );
  });

  it('should throw an error if any data in DataList is undefined', async () => {
    await expect(Update.recordByIds([1], 'Users', ['Name'], [sql.NVarChar], [[undefined]])).rejects.toThrow(
      "Data for field 'Name' in record 1 is undefined"
    );
  });

  it('should throw an error if parameters are not arrays or have different lengths', async () => {
    await expect(Update.recordByIds([1], 'Users', ['Name'], [sql.NVarChar], [['Alice', 30]])).rejects.toThrow(
      'Parameters are not arrays or have different lengths.'
    );
  });
});

/*
  it('should update records by batch successfully', async () => {
    const Ids = [1, 2, 3];
    const Table = 'AccessRight';
    const Field = ['Name'];
    const Type = [sql.NVarChar(50)];
    const DataList = [
        ['Alice'],
        ['Bob'],
        ['Charlie'],
    ];

    const result = await Update.recordByIds(Ids, Table, Field, Type, DataList);
    expect(result).toBe(true);
    expect(mockTransaction.begin).toHaveBeenCalled();
    expect(mockTransaction.commit).toHaveBeenCalled();
    expect(mockRequest.query).toHaveBeenCalled();
});

it('should rollback the transaction if an error occurs during the query', async () => {
    mockRequest.query = jest.fn().mockRejectedValueOnce(new Error('Query failed'));
    const Ids = [1, 2, 3];
    const Table = 'Users';
    const Field = ['Name', 'Age'];
    const Type = [sql.NVarChar, sql.Int];
    const DataList = [
      ['Alice', 30],
      ['Bob', 25],
      ['Charlie', 35],
    ];

    await expect(Update.recordByIds(Ids, Table, Field, Type, DataList)).rejects.toThrow(
      'Error updating records, using records: Query failed'
    );

    expect(mockTransaction.rollback).toHaveBeenCalled();
  });

  it('should throw an error if database query returns no results', async () => {
    mockRequest.query = jest.fn().mockResolvedValue({ rowsAffected: [0] });
    const Ids = [1, 2, 3];
    const Table = 'Users';
    const Field = ['Name', 'Age'];
    const Type = [sql.NVarChar, sql.Int];
    const DataList = [
      ['Alice', 30],
      ['Bob', 25],
      ['Charlie', 35],
    ];

    await expect(Update.recordByIds(Ids, Table, Field, Type, DataList)).rejects.toThrow(
      'Database query returned no results'
    );

    expect(mockTransaction.rollback).toHaveBeenCalled();
  });

*/