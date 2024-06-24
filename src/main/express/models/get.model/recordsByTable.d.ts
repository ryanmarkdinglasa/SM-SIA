/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : ALL TEST CASES, PASS
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-28 03:48PM
*/

import { Get } from '.'; // Import your model function
import { conn } from '../../config'; // Import database connection function

// Mock the database connection function
jest.mock('../../../src/config/', () => ({
    conn: jest.fn(), // Mock the function
}));

describe('Get.recordsByTable', () => {
    const mockRecordset = "superuser";

    beforeAll(() => {
        // Mock the database connection function to return a mock pool
        (conn as jest.Mock).mockReturnValue({
            request: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: mockRecordset }),
        });
    });

    it('should retrieve all records from the specified table', async () => {
        const table = 'User';
        const result = await Get.recordsByTable(table);
        expect(result[0].Username).toEqual(mockRecordset);
    });

    it('should throw an error if table name is not provided', async () => {
        await expect(Get.recordsByTable()).rejects.toThrow('Table must be a string');
    });

    it('should throw an error if table name is not a string', async () => {
        const table:any = 123;
        await expect(Get.recordsByTable(table)).rejects.toThrow('Table must be a string');
    });

    it('should throw an error if database query fails', async () => {
        (conn as jest.Mock).mockRejectedValueOnce(new Error('Database query failed'));
        const table = 'YourTableName';
        await expect(Get.recordsByTable(table)).rejects.toThrow(`Error fetching all records from ${table}: Invalid object name '${table}'`);
    });
});
