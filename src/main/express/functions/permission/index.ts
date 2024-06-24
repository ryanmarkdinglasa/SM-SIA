import { findByFields, } from '../find';
import { Get } from '../../models';
import { Int, NVarChar }  from 'mssql'; 
import { TABLE, QUERY } from '../../shared'; 

/**
 * Check if the actionId is in the permissions
 * @param {number} UserId 
 * @param {string} Action 
 * @returns {Promise<boolean>} - Returns true if the action is found in permissions
 */
export const isPermission = async (UserId: number = 0, Action: string = ''): Promise<boolean> => {
    try {
        if (!Action || !UserId) return false;
        const hasPermission = await findByFields(QUERY.q00x000, ['UserId','Action'], [Int, NVarChar(50)], [UserId, Action]);
        return hasPermission;
    } catch (error:any) {
        console.log('Error in isPermission function:', error.message);
        return false;
    }
};  // END HERE


/**
 * Creates a new token
 * @param {number} Id - User Id
 * @returns {Promise<String>} - returns a string of encrypted token
*/
 export const getUserPermissions = async (Id: number = 0): Promise<Array<any>> => {
    try {
        if (!Id) return [];
        const userExists = await Get.recordById(Id, TABLE.t010);
        if (!userExists) return [];
        const permissions = await Get.recordByFields(QUERY.q010x001, ['RoleId'], [Int], [Id]);
        return permissions;
    } catch (error) {
        console.error('Error in getUserPermissions:', error);
        return [];
    }
}; // END HERE