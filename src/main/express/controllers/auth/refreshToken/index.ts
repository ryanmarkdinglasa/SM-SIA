/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/
import { SUCCESS, CustomRequest } from '../../../shared'
import { generateToken, generateRefreshToken } from '../../../functions';
import { Response } from 'express';

export const refreshToken = async (req:CustomRequest, res:Response): Promise<any> => {
    try {
        const user = req.user;
        const accessToken = await generateToken(user);
        const refreshToken = await generateRefreshToken(user);
        res
            .header('Authorization', `Bearer ${accessToken}`)
            .header('Refresh-Token', refreshToken)
            .json({
            Login: true,
            message: SUCCESS.s00x00,
            user:user,
            accessToken:accessToken,
            refreshToken:refreshToken,
            });
    } catch (error) {
        console.error("Error refreshing tokens:", error);
        return res.status(500).json({ message: "Error refreshing tokens" });
    }
};



