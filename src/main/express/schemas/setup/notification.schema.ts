/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/
import Joi from 'joi';
export const NotificationSchema = Joi.object({
    UserId: Joi.number().integer(),
    Description: Joi.string(),
    LinkedComponent: Joi.string().allow(null),
    Status: Joi.number().integer()
});