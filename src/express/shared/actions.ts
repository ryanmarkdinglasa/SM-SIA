/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : LIST OF ACTIONS CAN BE DONE OF USERS
 * CHANGES      : GROUPINGS OF ACTIONS BY TABLE
 * LOG-DATE     : 2024-05-27 11:48PM
*/

export const ACTION = {

    // others/ such as reports, settings and whatsoever
    "t000":{
        "rpt1":"TicketSummaryReport",
        "rpt2":"TicketAgingReport",
        "rpt3":"TicketResolutionTimeReport",
        "rpt4":"CSATReport",
        "rpt5":"StaffPerformanceReport",
        "rpt6":"TicketCategoryAnalysisReport",
    },

    //access rights
    "t001":{
        "ls":"ViewAccessRightList",
        "gt":"ViewAccessRightDetails",
        "cr8":"CreateAccessRight",
        "rmv":"RemoveAccessRight",
        "rmvs":"RemoveMultipleAccessRight",
        "updt":"UpdateAccessRight",
    },

    // AuditTrail
    "t003":{
        "ls":"ViewAuditTrailList",
        "gt":"ViewAuditTrailDetails",
    },

    // Client
    "t004":{
        "ls":"ViewClientList",
        "gt":"ViewClientDetails",
        "cr8":"CreateClient",
        "rmv":"RemoveClient",
        "rmvs":"RemoveMultipleClient",
        "updt":"UpdateClient"
    },

    // Department
    "t006":{
        "ls":"ViewDepartmentList",
        "gt":"ViewDepartmentDetails",
        "cr8":"CreateDepartment",
        "rmv":"RemoveDepartment",
        "rmvs":"RemoveMultipleDepartment",
        "updt":"UpdateDepartment"
    },

    // Permission
    "t009":{
        "ls":"ViewPermissionList",
        "gt":"ViewPermissionDetail",
        "cr8":"CreatePermission",
        "rmv":"RemovePermission",
        "rmvs":"RemoveMultiplePermission",
        "updt":"UpdatePermission"
    },

    // Product
    "t010":{
        "ls":"ViewProductList",
        "gt":"ViewProductDetails",
        "cr8":"CreateProduct",
        "rmv":"RemoveProduct",
        "rmvs":"RemoveMultipleProduct",
        "updt":"UpdateProduct"
    },
    // Role
    "t011":{
        "ls":"ViewTicketList",
        "ls-a":"ViewAssignedTickets",
        "gt":"ViewTicketDetails",
        "cr8":"CreateTicket",
        "rmv":"RemoveTicket",
        "rmvs":"UpdateTicket",
        "updt":"UpdateRole"
    },

    // Ticket
    "t012":{
        "ls":"ViewRoleList",
        "gt":"ViewRoleDetails",
        "cr8":"CreateRole",
        "rmv":"RemoveRole",
        "rmvs":"RemoveMultipleRole",
        "updt":"UpdateRole"
    },

    // User
    "t014":{
        "ls":"ViewUserList",
        "gt":"ViewUserDetails",
        "cr8":"CreateUser",
        "rmv":"RemoveUser",
        "updt":"UpdateUser"
    },

    // TicketReview
    "t015":{
        "ls":"ViewTicketReviewList",
        "gt":"ViewTicketReviewDetails",
        "cr8":"ReviewTicket",
        "rmv":"RemoveTicketReview",
        "updt":"UpdateTicketReview"
    },

    // LicenseRequest
    "t016":{
        "ls":"ViewAllLicenseRequest",
        "gt":"ViewLicenseRequestDetails",
        "cr8":"CreateLicenseRequest",
        "rmv":"RemoveLicenseRequest",
        "updt":"UpdateLicenseRequest"
    },
}
