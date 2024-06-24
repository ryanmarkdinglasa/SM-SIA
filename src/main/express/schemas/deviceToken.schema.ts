/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
 */

import Joi from 'joi';

export const devicetoken_schema = Joi.object({
    UserId: Joi.number().integer().required(),
    Tokens: Joi.string().max(255).required()
});