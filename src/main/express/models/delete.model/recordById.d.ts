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

describe('Delete.recordById', () => {
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

    it('should delete a record with a valid Id and Table', async () => {
        const Id = 1;
        const Table = 'AccessRight';
        const result = await Delete.recordById(Id, Table);
        expect(mockRequest.input).toHaveBeenCalledWith('Id', Int, Id);
        expect(mockRequest.query).toHaveBeenCalledWith(`DELETE FROM [dbo].[${Table}] WHERE [Id] = @Id`);
        expect(result).toBe(true);
    });

    it('should throw an error if Id is not a valid number', async () => {
        const Id: any = 'invalid';
        const Table = 'Users';
        await expect(Delete.recordById(Id, Table)).rejects.toThrow('Id must be a valid number');
    });

    it('should throw an error if Table name is not provided as a non-empty string', async () => {
        const Id = 1;
        const Table: any = 123;
        await expect(Delete.recordById(Id, Table)).rejects.toThrow('Table name must be provided as a non-empty string');
    });

    it('should throw an error if Id is less than 1', async () => {
        const Id = 0;
        const Table = 'Users';
        await expect(Delete.recordById(Id, Table)).rejects.toThrow('Id must be a positive non-zero number');
    });

    it('should throw an error if connection fails', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(null);
        const Id = 1;
        const Table = 'Users';
        await expect(Delete.recordById(Id, Table)).rejects.toThrow('Connection failed');
    });

    it('should throw an error if database query does not delete a record', async () => {
        mockRequest.query = jest.fn().mockResolvedValue({ rowsAffected: [0] });
        const Id = 1;
        const Table = 'Users';
        await expect(Delete.recordById(Id, Table)).rejects.toThrow('Database query returned no results');
    });

    it('should throw an error for any other issues during query execution', async () => {
        mockRequest.query = jest.fn().mockRejectedValue(new Error('Some unexpected error'));
        const Id = 1;
        const Table = 'Users';
        await expect(Delete.recordById(Id, Table)).rejects.toThrow('Error removing records from Users: Some unexpected error');
    });
});