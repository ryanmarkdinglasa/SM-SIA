/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/


import { LoginSchema } from '../schemas';
import { ERROR, SUCCESS, CustomRequest } from '../shared'
import { getUserByUsername, comparePassword, generateToken, generateRefreshToken } from '../functions';
import { Response } from 'express';

export const login = async (req:CustomRequest, res:Response) => {
    try {
    const { Username, Password } = req.body;
    const { error }  = LoginSchema.validate({ Username, Password });
    if ( error ) return res.status(400).json({ Login: false, message: ERROR.e00x19 });

    const user = (await getUserByUsername(Username))[0];
    if (!user) return res.status(400).json({ Login: false, message: ERROR.e00x05 });
    if (user.isDeactivated === 1)  return res.status(401).json({ Login: false, message: ERROR.e00x20 });
    
    const isPasswordValid = await comparePassword(Password, user.Password);
    if (!isPasswordValid) return res.status(400).json({ Login: false, message: ERROR.e00x19 });

    const accessToken = await generateToken(user.Id);
    const refreshToken = await generateRefreshToken(user.Id);
    
    return res
        .header('Authorization', `Bearer ${accessToken}`)
        .header('Refresh-Token', refreshToken)
        .json({
            Login: true,
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } catch (error:any) {
        console.error('Error in login function:', error.message);
        return res.status(400).json({ Login: false, message: ERROR.e00x02 });
    }
};

export const test_token = async (req:CustomRequest, res:Response): Promise<any> => {
    try {
        const accessToken = req.headers['authorization'];
        const refreshToken = req.headers['refresh-token'];
        return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        console.error("Error test tokens:", error);
        res.status(500).json({ message: "Error test tokens" });
    }
};

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

export const refresh_token = async (req:CustomRequest, res:Response): Promise<any> => {
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



