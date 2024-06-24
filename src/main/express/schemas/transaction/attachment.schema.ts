/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import Joi from 'joi'
export const attachment_schema = Joi.object({
  TicketId: Joi.number().integer().allow(null), // FK of TicketSchema
  TicketReviewId: Joi.number().integer().allow(null), // FK of TicketReviewSchema
  Attachment: Joi.string().allow(null),
  LicenseRequestId: Joi.number().integer().allow(null) // FK of LicenseRequest
});
