/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : CONFIGURATION DATA
 * CHANGES      : REMOVE CODE FIELD IN PERMISSION FIELDS, AS IT IS NOT NEEDED 
 * LOG-DATE     : 2024-05-27 11:48PM
*/

// SETUP FIELDS
export const AccessRightField =  [ 'Code', 'Name', 'Description', 'IsDeleted', 'CreatedBy', 'DateCreated', 'UpdatedBy', 'DateUpdated'];
export const UserField =          [ 'Code', 'Username', 'Password', 'Firstname', 'Middlename', 'Lastname', 'Gender', 'Birthdate', 'Address', 'ContactNumber', 'Image', 'DepartmentId', 'RoleId', 'isDeactivated', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const ClientField =        [ 'Code', 'Name', 'Address', 'Email', 'ContactPerson', 'MobileNumber', 'LandlineNumber', 'DateSoftwareAcceptance', 'DateBCSRenewal', 'DateBCSExpiry', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const ClientLineField =    [ 'ClientId' , 'ProductId' , 'Quantity', 'DateCreated'];
export const DepartmentField =    [ 'Code', 'Name', 'Description', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated' ];
export const PermissionField =    [ 'RoleId', 'AccessRightId', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const ProductField =       [ 'Code',  'Name', 'Description', 'Category', 'Price', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const RoleField =          [ 'Code', 'Name', 'Description', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];

// TRANSACTIONS
export const TicketField =        [ 'TicketNumber', 'ClientId', 'Caller', 'Concern', 'ProductId', 'AnsweredBy', 'Status', 'Remarks', 'Category', 'Severity', 'AssignedBy', 'Solution', 'DoneDate', 'IsReviewed', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const TicketLineField =    [ 'TicketId', 'Action', 'DateCalled', 'DateFinished' ];
export const TicketReviewField =  [ 'TicketId', 'TicketReviewNumber', 'ReviewedBy', 'Comments', 'StatisfactoryRate', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
export const AttachmentField =    [ 'TicketId', 'TicketReviewId', 'Attachment'];
export const LicenseRequestField= [ 'RequestNumber', 'Title', 'Description', 'ClientId', 'ProductId', 'IsApprove', 'IsDeleted', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];

// LOGS
export const AuditTrailField =    [ 'UserId', 'Action', 'Record', 'RecordTable', 'DateCreated'];
export const NotificationFIeld =  [ 'UserId', 'Description', 'LinkedComponent',  'Status', 'DateCreated', 'DateUpdated'];
export const DeviceTokenField =   [ 'UserId', 'Tokens', 'CreatedBy', 'DateCreated',  'UpdatedBy', 'DateUpdated'];
