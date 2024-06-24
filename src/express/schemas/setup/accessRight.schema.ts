/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import Joi from 'joi';

export const AccessRightSchema = Joi.object({
    Code: Joi.string().pattern(/^[0-9]{6}$/),
    Name: Joi.string().max(50).required(),
    Description: Joi.string().max(255).required(),
    IsDeleted: Joi.number().integer(),
    DeletedBy: Joi.number().integer().allow(null)
});
