/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/
import { recordByQuery } from '../../models'
/**
 * Generate a 6 number code
 * @param {String} Table - Database table
 * @returns {Promise<String>} - returns a string of 6 digit latest code of a table
 */
export const generateCode = async (Table: string = ''): Promise<string> => {
    try {
        if (typeof Table !== 'string' || !Table) return '';
        const latest = await recordByQuery(`SELECT MAX([Code]) AS Code FROM [dbo].[${Table}]`);
        const code = String(parseInt(latest[0].Code || 0, 10) + 1).padStart( 6, "0" );
        if (!code) return '';
        return code;
    } catch (error:any) {
        console.log('Error in generateCode function:', error.message);
        return '';
    }
};  // END HERE

export * from './test';