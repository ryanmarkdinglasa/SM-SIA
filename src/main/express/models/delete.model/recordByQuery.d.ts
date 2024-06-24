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

describe('Delete.recordByQuery', () => {
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

    it('should throw an error if query is not provided', async () => {
        await expect(Delete.recordByQuery()).rejects.toThrow('Query must be provided as a non-empty string');
    });

    it('should throw an error if query is not a string', async () => {
        const query: any = 12345;
        await expect(Delete.recordByQuery(query)).rejects.toThrow('Query must be provided as a non-empty string');
    });

    it('should throw an error if connection fails', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(null);
        await expect(Delete.recordByQuery('DELETE FROM Users')).rejects.toThrow('Connection failed');
    });

    it('should throw an error if database query fails', async () => {
        mockRequest.query = jest.fn().mockRejectedValue(new Error('Query failedr'));

        await expect(Delete.recordByQuery('DELETE FROM Users')).rejects.toThrow('Error removing records, using recordByQuery: Query failed');
    });

    it('should return true if records are successfully deleted', async () => {
        mockRequest.query = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        const result = await Delete.recordByQuery('DELETE FROM Users');
        expect(result).toBe(true);
    });

    it('should throw an error if no records are affected', async () => {
        mockRequest.query = jest.fn().mockResolvedValue({ rowsAffected: [0] });
        await expect(Delete.recordByQuery('DELETE FROM [AccessRight]')).rejects.toThrow('Database query returned no results');
    });
});