/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import Joi from 'joi';

export const PermissionSchema = Joi.object({
    RoleId: Joi.number().integer().required(),
    AccessRightId: Joi.number().integer().required()
});