import {Request } from 'express';
import { Config } from '../config/database';
//
export interface CustomRequest extends Request {
    accessToken?: string;
    refreshToken?: string;
    user?: any;
    config?:Config;
}
