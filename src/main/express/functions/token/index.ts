/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/
import { token } from '../../shared';
import jwt from 'jsonwebtoken';
/**
 * Creates a new token
 * @param {number} User - User Id
 * @returns {Promise<String>} - returns a string of encrypted token
*/
export const generateToken = async (User: number = 0): Promise<string> => {
    let flag = '';
    try {
        if (isNaN(User) || typeof User !== 'number') return flag;
        return jwt.sign({ User }, token.SECRET, { expiresIn: "30m" });
    } catch(error: any) {
        console.log('Error Functions generateToken: Error' + error);
        return flag;
    }
}
/**
 * Creates a new token
 * @param {number} User - User Id
 * @returns {Promise<String>} - returns a string of encrypted token
*/
export const generateRefreshToken = async (User: number = 0): Promise<string> => {
    let flag = '';
    try {
        if (isNaN(User) || typeof User !== 'number') return flag;
        return jwt.sign({ User }, token.REFRESH, { expiresIn: "8h" });
    } catch(error: any) {
        console.log('Error Functions generateRefreshToken : Error' + error);
        return flag;
    }
}

export * from './test';