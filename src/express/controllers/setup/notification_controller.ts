    /**
     * AUTHOR       : Mark Dinglasa
     * COMMENT/S    : N/A
     * CHANGES      : N/A
     * LOG-DATE     : 2024-05-27 11:48PM
    */
   
    import { GET, ADD, DELETE, UPDATE} from '../../models/index.js'; import sql from 'mssql';
    import { err_msg, success_msg, QUERY, tbl} from '../../shared/index.js';
    import { notification_fields } from '../../type/index.js';
    import { notification_schema } from '../../schemas/index.js';
    import {  isFound } from '../../functions/index.js';

    const { Int, NVarChar, DateTime } = sql;

    //  WORKING AS EXPECTED
    export const get_all_notification = async (req, res) => {
        try {
            const crntId = req.user.user, {Id} = req.params;
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            const result = await GET.record_by_fields(QUERY.q08x001, ['UserId'] ,[Int] ,[Id]);
            if (!result) return res.status(400).json({ message: err_msg.e00x23 });
            return res.status(200).json({ data: result, message: success_msg.s00x00 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    //  WORKING AS EXPECTED
    export const get_notification = async (req, res) => {
        try {
            const { Id } = req.params, crntId = req.user.user;
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if (!Id) return res.status(400).json({ message: err_msg.e00x07 });
            const result = await GET.record_by_id(Id, tbl.t008);
            if (!result) return res.status(400).json({ message: err_msg.e00x05 });
            return res.status(200).json({ data: result, message: success_msg.s00x00 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    //  WORKING AS EXPECTED
    export const create_notification = async (req, res) => {
        try {
            const { UserId, Description, LinkedComponent, Status } = req.body, current_date = new Date().toISOString();
            const { error } = notification_schema.validate({ UserId, Description, LinkedComponent, Status });
            if (error) return res.status(400).json({ message: err_msg.e00x25, error:error});  
            const type = [ Int, NVarChar(255), NVarChar(255), Int, DateTime, DateTime];
            const data = [ UserId, Description, LinkedComponent, Status, current_date, null];
            if (!(await ADD.record(tbl.t008, notification_fields, type, data))) return res.status(400).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x02 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // WORKING AS EXPECTED
    export const update_notification = async (req, res) => {
        try {
            const { UserId, Description, LinkedComponent, Status } = req.body, {Id} = req.params, current_date = new Date().toISOString();
            const { error } = notification_schema.validate({ UserId, Description, LinkedComponent, Status });
            if (error) return res.status(400).json({ message: err_msg.e00x25, error:error});
            const type = [ Int, NVarChar(255), NVarChar(255), Int, DateTime];
            const tmp = notification_fields.filter(field => !['DateCreated'].includes(field));
            const data = [ UserId, Description, LinkedComponent, Status, current_date];
            if (!(await UPDATE.record(Id, tbl.t008, tmp, type, data))) return res.status(400).json({ message: err_msg.e00x03, error:error });
            return res.status(200).json({ message: success_msg.s00x04 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // WORKING AS EXPECTED
    export const remove_notification = async (req, res) => {
        try {
            const { Id } = req.params;
            if (!Id) return res.status(400).json({ message: err_msg.e00x07 });
            if (!(await isFound(tbl.t008, ['Id'], [Int], [Id]))) return res.status(400).json({ message: err_msg.e00x05 });
            if (!(await DELETE.record_by_id(Id, tbl.t008))) return res.status(400).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x03 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // WORKING AS EXPECTED
    export const remove_multiple_notification = async (req, res) => {
        try {
            const { data } = req.body, to_remove = [];
            if (!data || !Array.isArray(data) || data.length === 0) return res.status(400).json({ message: err_msg.e00x07 });
            for (let item of data) {
                if  (await isFound(tbl.t008, ['Id'], [Int], [item.Id])) to_remove.push(item.Id);
            }
            if (to_remove.length === 0) return res.status(200).json({ message: err_msg.e00x23 });
            if (!(await DELETE.record_by_ids(to_remove, tbl.t008))) return res.status(200).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x03 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
