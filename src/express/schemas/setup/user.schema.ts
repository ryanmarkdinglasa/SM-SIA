/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import Joi from 'joi';
import { Int, NVarChar, DateTime } from 'mssql';

export const UserSchema = Joi.object({
  Code: Joi.string().pattern(/^[0-9]{6}$/),
  Username: Joi.string().required(),
  Password: Joi.string().required(),
  Firstname: Joi.string().required(),
  Middlename: Joi.string().allow(null),
  Lastname: Joi.string().required(),
  Gender: Joi.string().required(),
  Birthdate: Joi.date().required(),
  Address: Joi.string().required(),
  ContactNumber: Joi.string().required(),
  Image: Joi.string().allow(null),
  DepartmentId: Joi.number().integer().allow(null),
  RoleId: Joi.number().integer().allow(null),
  IsDeactivated: Joi.number().integer().required(),
  IsDeleted: Joi.number().integer(),
  DeletedBy: Joi.number().integer().allow(null)
});

export const UserStructure = (Data:any): any => {
  return {
    Id:   { field:'Id', type: Int(), value: Data.Id },
    Code: { field:'Code', type: NVarChar(50), value: Data.Code },
  }
}


//update = ( Id, 'Name' '' )