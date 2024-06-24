/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import Joi from 'joi';

export const ClientSchema = Joi.object({
    Code: Joi.string().pattern(/^[0-9]{6}$/),
    Name: Joi.string().required(),
    Address: Joi.string().required(),
    Email: Joi.string().required(),
    ContactPerson: Joi.string().required(),
    MobileNumber: Joi.string().required(),
    LandlineNumber: Joi.string().allow(null),
    DateSoftwareAcceptance: Joi.date(),
    DateBCSExpiry: Joi.date(),
    DateBCSRenewal: Joi.date(),
    IsDeleted: Joi.number().integer(),
    DeletedBy: Joi.number().integer().allow(null)
  });
  
export const clientline_schema = Joi.object({
  Id: Joi.number().integer().required(),
  ClientId: Joi.number().integer().allow(null),
  ProductId: Joi.number().integer().required().allow(null),
  Quantity: Joi.number().precision(5).allow(null)
});
