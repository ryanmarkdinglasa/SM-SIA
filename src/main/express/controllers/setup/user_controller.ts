/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/
import { recordsByTable } from '../../models'
import { ERROR, SUCCESS, CustomRequest, CONFIG } from '../../shared';
import { Response } from 'express';
import storage from 'node-persist';

//import {getUserByUsername} from '../../functions';
/*
// WORKING AS EXPECTED
export const get_user = async (req: CustomRequest, res: Response) => {
    try {
        const crntId = req.user.user, { Id }: any =  req.params;
        if (!crntId) return res.status(400).json({ message: ERROR.e00x26});
        if (!Id) return res.status(400).json({ message: ERROR.e00x07});
        const user = await recordById(Id, TABLE.t014);
        if (!user) return res.status(400).json({ message: ERROR.e00x05});
        return res.status(200).json({ data:user, message: SUCCESS.s00x00});
    } catch(error){
        return res.status(500).json({ message: ERROR.e00x02});
    }
} // END HERE
*/

// WORKING AS EXPECTED
export const userList = async (req: CustomRequest, res: Response) => {
    try {
        const config = await storage.getItem(CONFIG);

        const user = await recordsByTable(config, 'MstUser');
        if (!user) return res.status(400).json({ message: ERROR.e00x05});
        return res.status(200).json({ data:user, message: SUCCESS.s00x00});
    } catch (error: any) {
      console.error('Database connection error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


  // WORKING AS EXPECTED
export const test = async (req: CustomRequest, res: Response) => {
    try {
        const cookie =  req.cookies.config;
        //if (!cookie) return res.status(400).json({ message: ERROR.e00x05});
        return res.status(200).json({ cookie});
    } catch (error: any) {
      console.error('Database connection error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
