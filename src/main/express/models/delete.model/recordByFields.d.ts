/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : ALL TEST CASES, PASS
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-28 03:48PM
*/

import { Delete } from '.'; // Adjust the import path as necessary
import { conn } from '../../config'; // Adjust the import path as necessary
import { ConnectionPool, Request, Int } from 'mssql';

jest.mock('../../../src/config', () => ({
    conn: jest.fn()
}));

describe('Delete.recordByFields', () => {
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

    it('should throw an error if Query is not provided', async () => {
        await expect(Delete.recordByFields()).rejects.toThrow('Query must be provided as a non-empty string');
    });

    it('should throw an error if Query is not a string', async () => {
        const query: any = 123;
        await expect(Delete.recordByFields(query)).rejects.toThrow('Query must be provided as a non-empty string');
    });

    it('should throw an error if any Field is undefined', async () => {
        const query = 'DELETE FROM [Users] WHERE [Id] = @Id';
        const fields = ['Id', undefined];
        const types = [Int, Int];
        const data = [1, 2];
        await expect(Delete.recordByFields(query, fields, types, data)).rejects.toThrow("Data for field 'field2' is undefined");
    });

    it('should throw an error if any Type is undefined', async () => {
        const query = 'DELETE FROM [Users] WHERE [Id] = @Id';
        const fields = ['Id', 'Name'];
        const types = [Int, undefined];
        const data = [1, 'John'];
        await expect(Delete.recordByFields(query, fields, types, data)).rejects.toThrow("Data for field 'field2' is undefined");
    });

    it('should throw an error if any Data is undefined', async () => {
        const query = 'DELETE FROM [Users] WHERE [Id] = @Id';
        const fields = ['Id', 'Name'];
        const types = [Int, Int];
        const data = [1, undefined];
        await expect(Delete.recordByFields(query, fields, types, data)).rejects.toThrow("Data for field 'field2' is undefined");
    });

    it('should throw an error if Field, Type, and Data lengths do not match', async () => {
        const query = 'DELETE FROM [Users] WHERE [Id] = @Id';
        const fields = ['Id', 'Name'];
        const types = [Int];
        const data = [1, 'John'];
        await expect(Delete.recordByFields(query, fields, types, data)).rejects.toThrow('Parameter is empty, or their lengths do not match');
    });

    it('should throw an error if connection fails', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(null);
        const query = 'DELETE FROM [Users] WHERE [Id] = @Id';
        const fields = ['Id'];
        const types = [Int];
        const data = [1];
        await expect(Delete.recordByFields(query, fields, types, data)).rejects.toThrow('Connection failed');
    });

    it('should throw an error if database query returns no results', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(mockPool);
        const query = 'DELETE FROM [Users] WHERE [Id] = @Id';
        const fields = ['Id'];
        const types = [Int];
        const data = [1];
        mockRequest.query = jest.fn().mockResolvedValue({ rowsAffected: [0] });
        await expect(Delete.recordByFields(query, fields, types, data)).rejects.toThrow('Database query returned no results');
    });

    it('should return true if records are successfully deleted', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(mockPool);
        const query = 'DELETE FROM [Users] WHERE [Id] = @Id';
        const fields = ['Id'];
        const types = [Int];
        const data = [1];
        mockRequest.query = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        const result = await Delete.recordByFields(query, fields, types, data);
        expect(result).toBe(true);
    });
});