/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import { Response, NextFunction} from 'express';
import { token, ERROR, CustomRequest } from '../shared';
import jwt from 'jsonwebtoken';

class Middleware {

  verifyToken(req: CustomRequest, res: Response, next: NextFunction):any {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken) return res.status(401).json({ valid: false, message: ERROR.e00x21 });
    jwt.verify(accessToken, token.SECRET, (error: any, user: any):any => {
      if (error) return this.refresh(req, res, next);
      req.user = user;
      req.accessToken = accessToken;
      req.refreshToken = refreshToken;
      next();
    });
  }

  refresh = (req: CustomRequest, res: Response, next: NextFunction):any => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).json({ valid: false, message: ERROR.e00x22 });
    jwt.verify(refreshToken, token.REFRESH, (error: any, user: any): any => {
      if (error) return res.status(401).json({ valid: false, message: ERROR.e00x21 });
      const newAccessToken = jwt.sign(user, token.SECRET, { expiresIn: '1d' });
      req.accessToken = newAccessToken;
      req.refreshToken = refreshToken;
      res.setHeader('Authorization', newAccessToken);
      next();
    });
  };
}

export default new Middleware();
