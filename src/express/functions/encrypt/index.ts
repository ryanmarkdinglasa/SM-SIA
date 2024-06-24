/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import crypto from 'crypto'; 
import { token } from '../../shared';

/**
 * Decrypts an encrypted password
 * @param {String} Password - Store encrypted password
 * @returns {Promise<Boolean>} - returns a string of decrypted password
*/
export const encryptPassword = async (Password: string = ''): Promise<string> => {
    try {
        if (!Password) return 'null';
        const algorithm = "aes-256-cbc";
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv( algorithm, Buffer.from(token.ENCRYPTION, "hex"), iv );
        let encryptedPassword = cipher.update(Password, "utf8", "hex");
        encryptedPassword += cipher.final("hex");
        return iv.toString("hex") + encryptedPassword;
    } catch(error) {
        console.log('Error Functions hashPassword');
        return 'null';
    }
}; // END HERE

/**
 * Decrypts an encrypted password
 * @param {String} encryptedPassword - Store encrypted password
 * @returns {Promise<Boolean>} - returns a string of decrypted password
 */
export const decryptPassword = async (encryptedPassword: string = ''): Promise<string> => {
    try {
        if (!encryptedPassword) return 'null';
        const iv = Buffer.from(encryptedPassword.slice(0, 32), "hex");
        const encryptedData = encryptedPassword.slice(32);
        const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(token.ENCRYPTION, "hex"), iv);
        let decryptedPassword = decipher.update(encryptedData, "hex", "utf8");
        decryptedPassword += decipher.final("utf8");
        return decryptedPassword;
    } catch (error:any) {
        console.log('Error in decryptPassword function:', error.message);
        return 'null';
    }
};  // END HERE

/**
 * Compares two password if it matches
 * @param {String} Password - Inputted password
 * @param {String} hashedPassword - Store encrypted password
 * @returns {Promise<Boolean>} - returns true or false
*/
export const comparePassword = async (Password: string = '', hashedPassword: string = ''): Promise<boolean> => {
    try {
        if (!Password || !hashedPassword) return false;
        const decrypted = await decryptPassword(hashedPassword);
        return (Password === decrypted);
    } catch (error:any) {
        console.log('Error in comparePassword function:', error.message);
        return false;
    }
};  // END HERE

export * from './test';
