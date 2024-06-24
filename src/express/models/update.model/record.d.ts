/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-28 03:48PM
*/

import Update from '.'; // Adjust the import path as necessary
import { conn } from '../../config'; // Adjust the import path as necessary
import { ConnectionPool, Request, Int, NVarChar } from 'mssql';

jest.mock('../../../src/config', () => ({
    conn: jest.fn()
}));

describe('Update.record', () => {
    let mockRequest: Partial<Request>;
    let mockPool: Partial<ConnectionPool>;

    beforeEach(() => {
        mockRequest = {
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ rowsAffected: [1] }),
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

    it('should update a record in the database', async () => {
        const Table = 'AccessRight';
        const expectedQuery = `UPDATE [dbo].[${Table}] SET Name = @Name WHERE Id = @Id`;
        await expect(Update.record(1, Table, ['Name'], [NVarChar(50)], ['John Doe'])).resolves.toBe(true);
        expect(mockPool.request).toHaveBeenCalled();
        expect(mockRequest.input).toHaveBeenCalledWith('Name', NVarChar(50), 'John Doe');
        expect(mockRequest.query).toHaveBeenCalledWith(expectedQuery);
    });
    
    it('should reject the promise for missing or empty table name', async () => {
        await expect(Update.record(1, '', ['Name'], [NVarChar(50)], ['John Doe'])).rejects.toThrow('Table name must be provided as a non-empty string');
    });

    it('should reject the promise for undefined field names', async () => {
        await expect(Update.record(1, 'AccessRight', [undefined], [NVarChar(50)], ['John Doe'])).rejects.toThrow("Data for field 'field1' is undefined");
    });

    it('should reject the promise for undefined data values', async () => {
        await expect(Update.record(1, 'AccessRight', ['Name'], [NVarChar(50)], [undefined])).rejects.toThrow("Data for field 'field1' is undefined");
    });

    it('should reject the promise for empty parameters', async () => {
        await expect(Update.record(1, 'AccessRight', [], [], [])).rejects.toThrow('Parameter is empty, or their lengths do not match');
    });

    it('should reject the promise for connection failure', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(null);
        await expect(Update.record(1, 'AccessRight', ['Name'], [NVarChar(50)], ['John Doe'])).rejects.toThrow('Connection failed');
    });

    it('should reject the promise for query error', async () => {
        mockRequest.query = jest.fn().mockRejectedValueOnce(new Error('Query error'));
        await expect(Update.record(1, 'AccessRight', ['Name'], [NVarChar(50)], ['John Doe'])).rejects.toThrow('Query error');
    });

    it('should reject the promise for no rows affected', async () => {
        mockRequest.query = jest.fn().mockResolvedValueOnce({ rowsAffected: [0] });
        await expect(Update.record(1, 'AccessRight', ['Name'], [NVarChar(50)], ['John Doe'])).rejects.toThrow('Database query returned no results');
    });

    it('should correctly set input parameters for the SQL query', async () => {
        const Id = 1;
        const Table = 'AccessRight';
        const Field = ['Name'];
        const Type = [NVarChar(50)];
        const Data = ['John Doe'];

        await Update.record(Id, Table, Field, Type, Data);
        expect(mockRequest.input).toHaveBeenCalledWith('Name', NVarChar(50), 'John Doe');
        expect(mockRequest.input).toHaveBeenCalledWith('Id', Int, 1);
    });

    it('should construct the SQL update query correctly', async () => {
        const Id = 1;
        const Table = 'AccessRight';
        const Field = ['Name', 'Age'];
        const Type = [NVarChar(50), Int];
        const Data = ['John Doe', 30];

        const expectedQuery = `UPDATE [dbo].[${Table}] SET Name = @Name, Age = @Age WHERE Id = @Id`;
        await Update.record(Id, Table, Field, Type, Data);
        expect(mockRequest.query).toHaveBeenCalledWith(expectedQuery);
    });
});