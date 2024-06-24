/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import { conn } from '../../config/database';
import { Int } from 'mssql';

export class Get {
    private Id: number;
    private Table: string;
    private Query: string;
    private Field: Array<string>;
    private Type: Array<any>;
    private Value: Array<any>;

    constructor(Id: number, Table?: string, Query?: string, Field?: Array<any>, Type?: Array<any>, Value?: Array<any>) {
        this.Id = Id || 0;
        this.Table = Table || '';
        this.Query = Query || '';
        this.Field = Field || [];
        this.Type = Type || [];
        this.Value = Value || [];
    }
    
    async recordByTable(): Promise<Array<any>> {
        try {
            if (typeof this.Table !== 'string' || !this.Table) return Promise.reject(new Error('Table must be a string'));

            const pool:any = await conn(); 
            if (!pool) return Promise.reject(new Error('Id must be a positive non-zero number'));

            const request = pool.request();
            const result = await request.query(`SELECT * FROM [${this.Table}]`);
            if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results.'));
            return result.recordset;
        } catch (error:any) {
            throw new Error(`Error fetching all records from ${this.Table}: ${error.message}`);
        } 
          
    }

    async recordById(): Promise<any> {
        try {
            if (!this.Id || typeof this.Id !== 'number') return Promise.reject(new Error('Id must be a valid number'));
            if (!this.Table || typeof this.Table !== 'string') return Promise.reject(new Error('Table name must be provided as a non-empty string'));
            if (this.Id < 1) return Promise.reject(new Error('Id must be a positive non-zero number'));
            
            const pool: any = await conn();
            if (!pool) return Promise.reject(new Error('Connection failed'));

            const request = pool.request();
            request.input('Id', Int, this.Id);
            const result = await request.query(`SELECT * FROM [${this.Table}] WHERE [Id] = @Id`);
            
            if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results'));
            
            return result.recordset[0];
        } catch (error: any) {
            throw new Error(`Error fetching record from ${this.Table}: ${error.message}`);
        }
    }

    
    async recordByFields(): Promise<Array<any>> {
        try {
            if (!this.Query || typeof this.Query !== 'string') return Promise.reject(new Error('Query is empty'));

            if (!this.Field.every(field => field !== undefined)) {
                const undefinedIndex1:any = this.Field.findIndex((field, index) => field === undefined);
                return Promise.reject(new Error(`Field for field 'field${parseInt(undefinedIndex1, 10) +1}' is undefined`));
            }

            if (!this.Type.every((field: undefined) => field !== undefined)) {
                const undefinedIndex2:any = this.Type.findIndex((field: undefined, index: any) => field === undefined);
                return Promise.reject(new Error(`Type for field 'field${parseInt(undefinedIndex2, 10) +1}' is undefined`));
            }

            if (!this.Value.every(field => field !== undefined)) {
                const undefinedIndex3:any = this.Value.findIndex((field, index) => field === undefined);
                return Promise.reject(new Error(`Data for field 'field${parseInt(undefinedIndex3, 10) +1}' is undefined`));
            }

            if (this.Field.length !== this.Value.length || this.Field.length !== this.Type.length) return Promise.reject(new Error('Parameters are empty, or their lengths do not match'));
            
            const pool:any = await conn();
            if (!pool)  return Promise.reject(new Error(`Connection failed`));
            
            pool.setMaxListeners(15);
            const request = pool.request();
            for (let i = 0; i < this.Field.length; i++) {
                if (this.Value[i] === undefined) return Promise.reject(new Error(`Data for field '${this.Field[i]}' is undefined`));
                request.input(this.Field[i], this.Type[i], this.Value[i]);
            }

            const result = await request.query(this.Query);
            if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results'));
            return result.recordset;
        } catch (error:any) {
            throw new Error(`Error function recordByFields : Internal Server Error`);
        } 
    }

    async recordByIdAndQuery(): Promise<any> {
        try {
            if (this.Id|| typeof this.Id !== 'number') return Promise.reject( new Error('Id must be a valid number'));

            if (!this.Query || typeof this.Query !== 'string') return Promise.reject( new Error('Query must be provided as a non-empty string'));

            if (this.Id < 1) return Promise.reject(new Error('Id must be a positive non-zero number'));

            const pool:any = await conn(); 
            if (!pool) return Promise.reject(new Error('Connection failed'));

            pool.setMaxListeners(15);
            const request = pool.request();
            request.input('Id', Int, this.Id);

            const result = await request.query(this.Query);
            if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results'));
            return result.recordset;
            
        } catch (error) {
            throw new Error(`Error function recordByIdAndQuery: Internal Server Error`);
        }
    }

    async recordByQuery(): Promise<Array<any>> {
        try {
          if (!this.Query || typeof this.Query !== 'string') return Promise.reject(new Error('Query must be provided as a non-empty string'));

          const pool:any = await conn(); 
          if (!pool) return Promise.reject(new Error('Connection failed'));

          pool.setMaxListeners(15);
          const result = await  pool.request().query(this.Query);

          if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results'));
          return result.recordset;

        } catch (error:any) {
          throw new Error(`Error function recordByQuery: Internal Server Error`);
        } 
    }

}; // END CLASS