    /**
     * AUTHOR       : Mark Dinglasa
     * COMMENT/S    : 
     * CHANGES      : Add new function, to display users permissions
     * LOG-DATE     : 2024-05-27 11:48PM
    */
   
    import { GET, ADD, DELETE, UPDATE} from '../../models/index.js'; import sql from 'mssql';
    import { err_msg, success_msg, QUERY, tbl} from '../../shared/index.js';
    import { permission_fields, ACTION} from '../../type/index.js';
    import { permission_schema } from '../../schemas/index.js';
    import { isPermission, generateCode, isFound, find_by_fields, isDefaultRecord } from '../../functions/index.js';

    const { Int, NVarChar, DateTime } = sql;

    // WORKING AS EXPECTED
    export const get_all_permission = async (req, res) => {
        try {
            const crntId = req.user.user, {Id} = req.params;
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if (!await isPermission(crntId, ACTION.t009.ls)) return res.status(400).json({ message: err_msg.e00x24});
            if (!Id) return res.status(400).json({ message: err_msg.e00x07 });
            const result = await GET.record_by_fields(QUERY.q09x001, ['UserId'], [Int], [Id]);
            if (!result || result.length < 1) return res.status(400).json({ message: err_msg.e00x23 });
            return res.status(200).json({ data: result, message: success_msg.s00x00 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // WORKING AS EXPECTED
    export const get_permission = async (req, res) => {
        try {
            const { Id } = req.params, crntId = req.user.user;
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if (!await isPermission(crntId, ACTION.t009.gt)) return res.status(400).json({ message: err_msg.e00x24});
            if (!Id) return res.status(400).json({ message: err_msg.e00x07 });
            const result = await GET.record_by_id(Id, tbl.t009);
            if (!result || result.length < 1) return res.status(400).json({ message: err_msg.e00x05 });
            return res.status(200).json({ data: result, message: success_msg.s00x00 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // WORKING AS EXPECTED
    export const create_permission = async (req, res) => {
        // create data in bulk
        try {
            const { data } = req.body, DateCreated = new Date().toISOString(), to_create = [], CreatedBy = req.user.user;
            if (!CreatedBy) return res.status(400).json({ message: err_msg.e00x26}); 
            if(!await isPermission(CreatedBy, ACTION.t009.cr8)) return res.status(400).json({ message: err_msg.e00x24});
            if (!Array.isArray(data)) return res.status(400).json({ message: err_msg.e00x23 });
           
            for (let record of data) {
                const recordWithDate = { ...record,  CreatedBy, DateCreated };
                const { error } = permission_schema.validate(recordWithDate);
                const RoleExist = await isFound(tbl.t011, ['Id'], [Int] ,[record.RoleId]);
                const AccessRightExist = await isFound(tbl.t001, ['Id'], [Int] ,[record.AccessRightId]);
                const isDuplicate = await isFound(tbl.t009, ['RoleId', 'AccessRightId'], [Int, Int] ,[record.RoleId, record.AccessRightId]);
                if (!error && !isDuplicate && RoleExist && AccessRightExist) to_create.push(Object.values(recordWithDate));
            }
            const type = [ Int, Int, Int, DateTime ];
            const tmp = permission_fields.filter(field => !['UpdatedBy', 'DateUpdated'].includes(field));
            if (to_create.length < 1) return res.status(400).json({ message: err_msg.e00x23 });
            if (!(await ADD.records(tbl.t009, tmp, type, to_create))) return res.status(400).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x02 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // WORKING AS EXPECTED
    export const update_permission = async (req, res) => {
        try {
            const { Name, Description } = req.body, { Id } = req.params, crntId = req.user.user, current_date = new Date().toISOString();
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if (!await isPermission(crntId, ACTION.t009.cr8)) return res.status(400).json({ message: err_msg.e00x24});
            if (!Id) return res.status(400).json({ message: err_msg.e00x07 });
            const { error } = permission_schema.validate({ Name, Description });
            if (error) return res.status(400).json({ message: err_msg.e00x25});  
            if (await isFound(tbl.t009, ['Name'], [NVarChar(50)], [Name])) return res.status(400).json({ message: err_msg.e00x06 });
            const fieldsToRemove = ['Code', 'CreatedBy', 'DateCreated', 'IsDeleted'];
            const updated_fields = permission_fields.filter(field => !fieldsToRemove.includes(field));
            const type = [  NVarChar(50), NVarChar(50), Int, DateTime];
            const data = [  Name, Description, crntId, current_date];
            if (!(await UPDATE.record(Id, tbl.t009, updated_fields, type, data))) return res.status(400).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x04 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE
    // WORKING AS EXPECTED
    export const remove_multiple_permission = async (req, res) => {
        try {
            const crntId = req.user.user, { data } = req.body, to_remove = [];
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            if (!await isPermission(crntId, ACTION.t009.rmvs)) return res.status(400).json({ message: err_msg.e00x24});
            if (!data || !Array.isArray(data) || data.length === 0) return res.status(400).json({ message: err_msg.e00x07 });
            for (let item of data) {
                const exists = await isFound(tbl.t009, ['Id'], [Int], [item.Id]);
                const isDefault = await isDefaultRecord(item.Id, tbl.t009);
                if (exists  && !isDefault ) to_remove.push(item.Id);
            }
            if (to_remove.length === 0) return res.status(200).json({ message: err_msg.e00x23 });
            if (!(await DELETE.record_by_ids(to_remove, tbl.t009))) return res.status(200).json({ message: err_msg.e00x03 });
            return res.status(200).json({ message: success_msg.s00x03 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE


    // show in selection of permission
    export const get_user_accessright = async (req, res) => {
        try {
            const crntId = req.user.user;
            if (!crntId) return res.status(400).json({ message: err_msg.e00x26}); 
            const result = await GET.record_by_fields(`SELECT [Name],[Description] FROM [AccessRight] WHERE [User]`, [], [], []);
            if (!result || result.length < 1) return res.status(400).json({ message: err_msg.e00x23 });
            return res.status(200).json({ data: result, message: success_msg.s00x00 });
        } catch(error) {
            return res.status(500).json({ message: err_msg.e00x02 });
        }
    }; // END HERE