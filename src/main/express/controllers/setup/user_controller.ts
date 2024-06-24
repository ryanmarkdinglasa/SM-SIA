/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import { Get } from '../../models/index.js'
import { ERROR, SUCCESS, TABLE, CustomRequest } from '../../shared/index.js';
import { Response } from 'express';

// WORKING AS EXPECTED
export const current_user = async (req: CustomRequest, res: Response) => {
    try {
        // No need permission to view Profile
        const crntId = req.user.user;
        if (!crntId) return res.status(400).json({ message: ERROR.e00x26});
        const user = await Get.recordById(crntId, TABLE.t014);
        if (!user) return res.status(400).json({ message: ERROR.e00x05});
        return res.status(200).json({ data: user, message: SUCCESS.s00x00});
    } catch(error) {
        return res.status(500).json({ message: ERROR.e00x02});
    }
} // END HERE

// WORKING AS EXPECTED
export const get_user = async (req: CustomRequest, res: Response) => {
    try {
        const crntId = req.user.user, { Id }: any =  req.params;
        if (!crntId) return res.status(400).json({ message: ERROR.e00x26});
        if (!Id) return res.status(400).json({ message: ERROR.e00x07});
        const user = await Get.recordById(Id, TABLE.t014);
        if (!user) return res.status(400).json({ message: ERROR.e00x05});
        return res.status(200).json({ data:user, message: SUCCESS.s00x00});
    } catch(error){
        return res.status(500).json({ message: ERROR.e00x02});
    }
} // END HERE
