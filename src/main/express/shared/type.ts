import {Request } from 'express';
//
export interface CustomRequest extends Request {
    accessToken?: string;
    refreshToken?: string;
    user?: any;
}