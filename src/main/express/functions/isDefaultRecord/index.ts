/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/
import { DEFAULT } from '../../shared';
/**
 * Check if the record is default
 * @param {number} Id - Record Id
 * @param {String} Table - Database table
 * @returns {Promise<String>} - returns true or flase
*/
 export const isDefaultRecord = async (Id: number = 0, Table: string = ''): Promise<boolean> => {
    let flag = false;
    try {
        if (!Id || !Table) return flag; 
        if (DEFAULT[Table] && DEFAULT[Table].includes(Id)) flag = true;
    } catch (error) {
        console.log('Error Functions isDefaultRecord');
    }
    return flag;
};  // END HERE

export * from './test';