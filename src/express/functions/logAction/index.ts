/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import { Int, NVarChar, DateTime }  from 'mssql';  
import { Add } from '../../models';
import { AuditTrailField, TABLE } from '../../shared';
import { AuditTrailSchema } from '../../schemas';
import { isFound } from '../find';

/**
 * Logs the actions of a user
 * @param {number} UserId - Existing UserId
 * @param {String} Action - Action executed of the user
 * @param {String} Record - Record the user used
 * @param {String} Table - Database table
 * @returns {Promise<String>} - returns true or flase
 * audit trail is where the transaction of each table refers to
 * audit trail cannot be deleted
*/
export const logUserAction = async (UserId: number = 0, Action: string = '', Record: number = 0, Table: string = ''): Promise<boolean> => {
    try {
        if (!UserId || !Action || !Record || !Table ) return false;
        const DateCreated = new Date().toISOString();
        const { error } = AuditTrailSchema.validate({UserId, Action, Record, Table, DateCreated});
        if (error) return false;
        if (! await isFound(TABLE.t014, ['Id'], [Int], [UserId]))  return false;
        const log = await Add.record(TABLE.t003, AuditTrailField, [Int, NVarChar(50), Int, NVarChar(50), DateTime], [UserId, Action, Record, Table, DateCreated]);
        return log;
    } catch(error) {
        console.log('Error Functions logUserAction');
        return false;
    }
}; // END HERE

export * from './test';