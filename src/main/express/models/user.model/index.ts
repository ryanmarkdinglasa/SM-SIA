

import { Add, Update, Delete }   from '../'
import { ERROR, TABLE, SUCCESS, QUERY } from '../../shared';
import { Int, NVarChar, DateTime } from 'mssql'
import { findByFields, generateCode, isFound, isDefaultRecord, hashPassword} from '../../functions';
import { UserSchema } from '../../schemas';

export class User {
    private Id: number;         private Username: string;
    private Password: string;   private Firstname: string;
    private Middlename: string; private Lastname: string;
    private Gender: string;     private Birthdate: Date;
    private Address: string;    private ContactNumber: string;
    private Image: any;         private DepartmentId: number;
    private RoleId: number;     private IsDeactivated: number;
    private IsDeleted: number;  private DeletedBy: number;
    private CreatedBy: number;  private UpdatedBy: number;
    private UserData: any;      private UserId: any;

    constructor( UserData: any, UserId?: number ){

        this.UserData = UserData;
        this.Id = UserData.Id || null;
        this.Username = UserData.Username;
        this.Password = UserData.Password;
        this.Firstname = UserData.Firstname;
        this.Middlename = UserData.Middlename || null;
        this.Lastname = UserData.Lastname;
        this.Birthdate = UserData.Birthdate;
        this.Gender = UserData.Gender;
        this.Address = UserData.Address;
        this.Image = UserData.Image || null;
        this.ContactNumber = UserData.ContactNumber;
        this.DepartmentId = UserData.DepartmentId;
        this.RoleId = UserData.RoleId;
        this.IsDeactivated = UserData.IsDeactivated;
        this.DeletedBy = UserData.DeletedBy || null;
        this.IsDeleted = UserData.IsDeleted || 0;
        this.CreatedBy = UserData.CreatedBy;
        this.UpdatedBy = UserData.UpdatedBy || null;
        this.UserId = UserId;
        
        if (!(this.Middlename)) this.Middlename = 'null';
        if (!(this.Image)) this.Image = 'null';
        if (!this.Id || this.Id === undefined || this.Id === null) this.Id = 0;

    }

    async validateData ():Promise<any>{
        let flag = false;
        const { error } = UserSchema.validate(this.UserData);
        if (error) return { result: flag };
        if (!this.UserId || this.UserId === undefined || this.UserId === null) return { result: flag };
        if (!await isFound(TABLE.t014, ['Id'], [Int], [this.UserId])) return { result: flag };
        flag = true;
        return { result: flag };
    }
    async validateUser ():Promise<any>{
        let flag = false;
        if (!this.Id || this.Id === undefined || this.Id === null) return { result: flag };
        if (!await isFound(TABLE.t014, ['Id'], [Int], [this.Id])) return { result: flag };
        flag = true;
        return { result: flag };
    }
    async validateCurrentUser ():Promise<any>{
        let flag = false;
        if (!this.UserId || this.UserId === undefined || this.UserId === null) return { result: flag };
        if (!await isFound(TABLE.t014, ['Id'], [Int], [this.UserId])) return { result: flag };
        flag = true;
        return { result: flag };
    }

    async save(): Promise<any> {
        try {
            this.Password = await hashPassword(this.Password);
            let Value: Array<any>;
            const Field: Array<string> = [
                'Code',         'Username',     'Password',     'Firstname',    'Middlename',   'Lastname', 
                'Gender',       'Birthdate',    'Address',      'ContactNumber','Image',        'DepartmentId',
                'RoleId',       'IsDeactivated','IsDeleted',    'DeletedBy',    'CreatedBy',    'DateCreated',  
                'UpdatedBy',    'DateUpdated'
            ];
            const Type: Array<any> = [
                NVarChar(50),   NVarChar(255),  NVarChar(255),  NVarChar(50),   NVarChar(50),   NVarChar(50),
                NVarChar(50),   DateTime,       NVarChar(255),  NVarChar(50),   NVarChar(255),  Int,
                Int,            Int,            Int,            Int,            Int,            DateTime,
                Int,            DateTime
            ];
            
            if (this.Id) { //  if Id exists then it is to update else create
                const tmpField = Field.filter(field => !['Code', 'Password', 'IsDeactivated', 'IsDeleted', 'DeletedBy', 'CreatedBy', 'DateCreated'].includes(field));
                const indicesToRemove = [0, 2, 13, 14, 15, 16, 17]; indicesToRemove.sort((a, b) => b - a);
                for (let i = 0; i < indicesToRemove.length; i++) { Type.splice(indicesToRemove[i], 1); }
                if (await findByFields(QUERY.q014x003, ['Username', 'Id'],[NVarChar(255), Int],[this.Username, this.Id])) return { message: ERROR.e00x27, result: false };
                if (await isDefaultRecord(this.Id, TABLE.t014)) return { message: ERROR.e00x10, result: false };
                Value = [ 
                    this.Username, this.Firstname, this.Middlename, this.Lastname, this.Gender, this.Birthdate, 
                    this.Address, this.ContactNumber, this.Image,  this.DepartmentId, this.RoleId,
                    this.UserId, new Date().toISOString(), 
                ];
                if (!await Update.record(this.Id, TABLE.t014, tmpField, Type, Value)) return { message: ERROR.e00x03, result: false };
                return { message: SUCCESS.s00x04, result: true };
            }   

            const Code = await generateCode(TABLE.t014);
            Value = [ 
                Code,           this.Username,      this.Password,      this.Firstname,     this.Middlename,    this.Lastname,  
                this.Gender,    this.Birthdate,     this.Address,       this.ContactNumber, this.Image,         this.DepartmentId, 
                this.RoleId,    0,                  this.IsDeleted,     0,               this.UserId,     
                new Date().toISOString(), null, null
            ];  
            if (await isFound(TABLE.t014, ['Username'], [NVarChar(50)], [this.Username])) return { message: ERROR.e00x06, result: false };
            if (!await Add.record(TABLE.t014, Field, Type, Value)) return { message: ERROR.e00x03, result: false };
            return { message: SUCCESS.s00x02, result: true };

        } catch (error:any) {
            return { message: error.message, result: false };
        }
    }

    async trash(): Promise<any> {
        if (!this.Id) return { message: ERROR.e00x07, removed: false };
        if (!(await isFound(TABLE.t014, ['Id'], [Int], [this.Id]))) return { message: ERROR.e00x05, removed: false };
        if (await isDefaultRecord(this.Id, TABLE.t014) || await isFound(TABLE.t003, ['UserId'], [Int], [this.Id])) return { message: ERROR.e00x04, removed: false };
        if (!await Update.record(this.Id, TABLE.t014, ['IsDeleted', 'DeletedBy'], [Int, Int], [1, this.UserId])) return { message: ERROR.e00x03, removed: false };
        return { message: SUCCESS.s00x03, result: true };
    }

    async changePassword(): Promise<any> {
        if (!this.Id) return { message: ERROR.e00x07, removed: false };
        const hashed = await hashPassword(this.Password);
        if (!await Update.record(this.Id, TABLE.t014, ['Password'], [NVarChar(255)], [hashed])) return { message: ERROR.e00x03, result: true };
        return { message: SUCCESS.s00x04, result: true };
    }

    async remove(): Promise<any> {
        if (!this.Id) return { message: ERROR.e00x07, removed: false };
        if (!(await isFound(TABLE.t014, ['Id'], [Int], [this.Id]))) return { message: ERROR.e00x05, removed: false };
        if (await isDefaultRecord(this.Id, TABLE.t014) || await isFound(TABLE.t003, ['UserId'], [Int], [this.Id])) return { message: ERROR.e00x04, removed: false };
        if (!await Delete.recordById(this.Id, TABLE.t014)) return { message: ERROR.e00x03, removed: false };
        return { message: SUCCESS.s00x03, result: true };
    }
}; // END CLASS

