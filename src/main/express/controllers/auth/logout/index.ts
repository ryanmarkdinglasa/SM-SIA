/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import { ERROR, SUCCESS, CustomRequest } from '../../../shared'
import { Response } from 'express';

export const logout = async (req:CustomRequest, res:Response) => {
    try {
        req.headers['refresh-token'] = '';
        req.headers['authorization'] = '';
        return res.status(200).json({ success: true, message: SUCCESS.s00x00 });
    } catch (error:any) {
        console.error('Error in login function:', error.message);
        return res.status(400).json({ Login: false, message: ERROR.e00x02 });
    }
};


