/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : CONFIGURATION DATA
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import * as dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
	user: process.env.DB_USER as string,
	password: process.env.DB_PASS as string,
	server: process.env.DB_SERVER as string,
	database: process.env.DB_NAME as string,
	options: {
		trustedConnection: true,
		enableArithAbort: true,
		encrypt: true,
		trustServerCertificate: true,
	},
	port: parseInt(process.env.DB_PORT || '1433', 10) as number, // Default to port 1433 if not provided
};

export const token = {
    SECRET:  process.env.ACCESS_TOKEN_SECRET  as string,
    REFRESH: process.env.REFRESH_TOKEN_SECRET as string,
    ENCRYPTION: process.env.ENCRYPTION_KEY as string,
}