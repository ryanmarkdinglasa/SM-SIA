/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : ALL TEST CASES, PASS
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-28 03:48PM
*/

import { Get } from '.';
import { conn } from '../../config';

jest.mock('../../../src/config/', () => ({
    conn: jest.fn(), // Mock the function
}));

describe('Get.recordById', () => {
    const mockRecordset = 'superuser';
    
    beforeAll(() => {
        // Mock the database connection function to return a mock pool
        (conn as jest.Mock).mockReturnValue({
            request: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: mockRecordset }),
        });
    });

    it('should retrieve the record with the specified Id from the specified table', async () => {
        const Id = 1;
        const Table = 'User';
        (conn as jest.Mock).mockResolvedValueOnce({
            recordset: [mockRecordset],
        });
        const result = await Get.recordById(Id, Table);
        expect(result.Username).toEqual(mockRecordset);
    });
    it('should throw an error if Id is not a number', async () => {
        const id:any = 'invalid';
        const table:any = 'User';
        await expect(Get.recordById(id, table)).rejects.toThrow('Id must be a valid number');
    });

    it('should throw an error if Id is missing or not provided', async () => {
        const table = 'User';
        await expect(Get.recordById(undefined, table)).rejects.toThrow('Id must be a positive non-zero number');
    });

    it('should throw an error if Table name is not a string', async () => {
        const id:any = 1;
        const table:any = 123;
        await expect(Get.recordById(id, table)).rejects.toThrow('Table name must be provided as a non-empty string');
    });

    it('should throw an error if Table name is missing or not provided', async () => {
        const id = 1;
        await expect(Get.recordById(id)).rejects.toThrow('Table name must be provided as a non-empty string');
    });

    it('should throw an error if database query returns no results', async () => {
        const id = 1;
        const table = 'NonExistentTable';
        (conn as jest.Mock).mockResolvedValueOnce({ recordset: [] });
        await expect(Get.recordById(id, table)).rejects.toThrow(`Error fetching record from ${table}: Invalid object name '${table}'.`);
    });
});
