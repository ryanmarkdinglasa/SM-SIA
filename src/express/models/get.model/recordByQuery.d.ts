/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : ALL TEST CASES, PASS
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-28 03:48PM
*/

import { Get } from '.'; // Adjust the import path as necessary
import { conn } from '../../config'; // Adjust the import path as necessary
import { ConnectionPool, Request } from 'mssql';

jest.mock('../../../src/config', () => ({
    conn: jest.fn()
}));

describe('Get.recordByQuery', () => {
    const mockRecordset = [
        {  Name: 'ViewRoleList' },
        {  Name: 'ViewRoleDetails' },
        {  Name: 'CreateRole' },
    ];

    let mockRequest: Partial<Request>;
    let mockPool: Partial<ConnectionPool>;

    beforeEach(() => {
        mockRequest = {
            query: jest.fn().mockResolvedValue({ recordset: mockRecordset }),
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

    it('should retrieve records based on the provided query', async () => {
        const query = 'SELECT TOP 3 [Name] FROM [AccessRight] ORDER BY [Id]';
        const result = await Get.recordByQuery(query);
        expect(result).toEqual(mockRecordset);
    });

    it('should throw an error if Query is not provided as a string', async () => {
        const query: any = null;
        await expect(Get.recordByQuery(query)).rejects.toThrow('Query must be provided as a non-empty string');
    });

    it('should throw an error if Query is an empty string', async () => {
        const query = '';
        await expect(Get.recordByQuery(query)).rejects.toThrow('Query must be provided as a non-empty string');
    });

    it('should throw an error if database query returns no results', async () => {
        mockRequest.query = jest.fn().mockResolvedValue({ recordset: [] });
        const query = 'SELECT * FROM [User] WHERE [Id] = 999';
        await expect(Get.recordByQuery(query)).rejects.toThrow('Database query returned no results');
    });

    it('should handle database connection errors', async () => {
        (conn as jest.Mock).mockRejectedValueOnce(new Error('Connection failed'));
        const query = 'SELECT * FROM Users';
        await expect(Get.recordByQuery(query)).rejects.toThrow('Error function recordByQuery: Internal Server Error');
    });

    it('should throw a generic error for any other issues', async () => {
        const query = 'SELECT * FROM Users';
        mockRequest.query = jest.fn().mockRejectedValue(new Error('Some unexpected error'));
        await expect(Get.recordByQuery(query)).rejects.toThrow('Error function recordByQuery: Internal Server Error');
    });

    it('should throw an error if the pool is not available', async () => {
        (conn as jest.Mock).mockResolvedValue(null);
        const query = 'SELECT * FROM Users';
        await expect(Get.recordByQuery(query)).rejects.toThrow('Error function recordByQuery: Internal Server Error');
    });
});
/*



    
    */