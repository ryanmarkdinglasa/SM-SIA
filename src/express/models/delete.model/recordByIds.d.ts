/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : Cannot simulate the sql.Transaction for unknown reasons
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-28 03:48PM
*/

import { Delete } from '.'; // Adjust the import path as necessary
import { conn } from '../../config'; // Adjust the import path as necessary
import { ConnectionPool, Request, Int, Transaction } from 'mssql';

jest.mock('../../../src/config', () => ({
    conn: jest.fn()
}));

describe('Delete.recordByIds', () => {
    let mockRequest: Partial<Request>;
    let mockPool: Partial<ConnectionPool>;
    let mockTransaction: Partial<Transaction>;

    beforeAll(() => {
        jest.setTimeout(60000); // Set timeout to 60 seconds
    });

    beforeEach(() => {
        mockTransaction = {
            begin: jest.fn().mockResolvedValue(undefined),
            commit: jest.fn().mockResolvedValue(undefined),
            rollback: jest.fn().mockResolvedValue(undefined),
        };
        mockRequest = {
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ rowsAffected: [1] }),
        };
        mockPool = {
            request: jest.fn().mockReturnValue(mockRequest as Request),
            transaction: jest.fn().mockReturnValue(mockTransaction as Transaction),
            setMaxListeners: jest.fn()
        };
        (conn as jest.Mock).mockResolvedValue(mockPool as ConnectionPool);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if Table is not provided', async () => {
        await expect(Delete.recordByIds([], '')).rejects.toThrow('Table name must be provided as a non-empty string');
    });

    it('should throw an error if Data is not an array', async () => {
        const data: any = 'not-an-array';
        await expect(Delete.recordByIds(data, 'Users')).rejects.toThrow('Data parameter is missing or empty.');
    });

    it('should throw an error if Data is an empty array', async () => {
        await expect(Delete.recordByIds([], 'Users')).rejects.toThrow('Data parameter is missing or empty.');
    });

    it('should throw an error if Data contains undefined values', async () => {
        const data:any = [{ Id: 1 }, undefined, { Id: 3 }];
        await expect(Delete.recordByIds(data, 'Users')).rejects.toThrow(`One or more Id's in the Data array are undefined`);
    });

    it('should throw an error if connection fails', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(null);
        await expect(Delete.recordByIds([{ Id: 1 }], 'Users')).rejects.toThrow('Connection failed');
    });
});
/*   
    it('should throw an error if database query returns no results', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(mockPool);
        mockRequest.query = jest.fn().mockResolvedValueOnce({ rowsAffected: [0] });
        await expect(Delete.recordByIds([1, 2, 3], 'Users')).rejects.toThrow('Database query returned no results');
        expect(mockTransaction.rollback).toHaveBeenCalled();
    });

    it('should throw an error if database query returns no results', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(mockPool as ConnectionPool);
        mockRequest.query = jest.fn().mockResolvedValueOnce({ rowsAffected: [0] });
        
        await expect(Delete.recordByIds([{ Id: 1 }], 'Users')).rejects.toThrow('Database query returned no results');
        expect(mockTransaction.rollback).toHaveBeenCalled();
    });

    
     it('should throw an error if database query returns no results', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(mockPool);
        mockRequest.query = jest.fn().mockResolvedValueOnce({ rowsAffected: [0] });
        await expect(Delete.recordByIds([1, 2, 3], 'Users')).rejects.toThrow('Database query returned no results');
        expect(mockTransaction.rollback).toHaveBeenCalled();
    });

    it('should throw an error if database query returns no results', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(mockPool);
        mockTransaction.begin = jest.fn().mockResolvedValueOnce(undefined);
        mockRequest.query = jest.fn().mockResolvedValueOnce({ rowsAffected: [0] });
        await expect(Delete.recordByIds([{ Id: 1 }], 'Users')).rejects.toThrow('Database query returned no results');
        expect(mockTransaction.rollback).toHaveBeenCalled();
    });
    
    it('should rollback transaction if an error occurs during query', async () => {
        (conn as jest.Mock).mockResolvedValueOnce(mockPool);
        mockTransaction.begin = jest.fn().mockResolvedValueOnce(undefined);
        mockRequest.query = jest.fn().mockRejectedValueOnce(new Error('Query failed'));
        await expect(Delete.recordByIds([{ Id: 1 }], 'Users')).rejects.toThrow('Error removing records, using recordByIds: Query failed');
        expect(mockTransaction.rollback).toHaveBeenCalled();
    });
*/