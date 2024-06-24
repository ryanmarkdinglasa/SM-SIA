/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import { NVarChar }  from 'mssql'; 
import { Get } from '../../models'
import { QUERY } from '../../shared'; 

/**
 * Get an existing user
 * @param {String} Username - Username of a user
 * @returns {Promise<JSON>} - returns a data of a user
*/

export const getUserByUsername = async (Username: string = ''): Promise<any> => {
    try{
        if (!Username || Username === undefined) return [];
        const user = await Get.recordByFields(QUERY.q014x002, ['Username'], [NVarChar(255)], [Username]);
        if (!user) return [];
        return user[0];
    }catch(error){
        console.log('Error Functions getUserByUsername' + error);
        return [];
    }
}; // END HERE

// TEST CASES
export * from './test'