/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/


import { LoginSchema } from '../../../schemas';
import { ERROR, CustomRequest } from '../../../shared'
import { getUserByUsername, generateToken, generateRefreshToken } from '../../../functions';
import { Response } from 'express';

export const login = async (req:CustomRequest, res:Response) => {
    try {
    const data = req.body;
    let UserName = data.UserName, Password = data.Password

    const { error }  = LoginSchema.validate({ UserName, Password });
    if ( error ) return res.status(400).json({ isLogin: false, message: ERROR.e00x19, error:error });
    
    const user = (await getUserByUsername(UserName))[0];
    if (!user) return res.status(400).json({ isLogin: false, message: ERROR.e00x05 });

    const isPasswordValid = (Password === user.Password);
    if (!isPasswordValid) return res.status(400).json({ isLogin: false, message: ERROR.e00x19 });

    const accessToken = await generateToken(user.Id);
    const refreshToken = await generateRefreshToken(user.Id);
    
    return res
        .header('Authorization', `Bearer ${accessToken}`)
        .header('Refresh-Token', refreshToken)
        .json({ isLogin: true, user: user, accessToken: accessToken, refreshToken: refreshToken });
    } catch (error:any) {
        console.error('Error in login function:', error.message);
        return res.status(400).json({ isLogin: false, message: ERROR.e00x02 });
    }
};