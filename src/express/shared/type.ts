import {Request, Response } from 'express';
//
export interface CustomRequest extends Request {
    accessToken?: string;
    refreshToken?: string;
    user?: any;
}