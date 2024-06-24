/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
 */

import Joi from 'joi';
export const ticketreview_schema = Joi.object({
    TicketId: Joi.number().integer().required(), // FK of TicketSchema
    TicketReviewNumber: Joi.string().allow(null),
    ReviewedBy: Joi.number().integer().required(), // PK of User
    Comments: Joi.string().allow(null),
    SatisfactoryRate: Joi.number().integer().required()
});