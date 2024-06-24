/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : ALL QUERIES USED IN FUNCTIONS
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

export const QUERY = {
    // OtherQueries 
    "q00x000":"SELECT [AccessRight].[Name] AS [Action], [User].[Id] AS [UserId] FROM [Permission] INNER JOIN [AccessRight] ON [AccessRight].Id = [Permission].[AccessRightId] INNER JOIN [Role] ON [Role].[Id] = [Permission].[RoleId] INNER JOIN [User] ON [User].[RoleId] = [Role].[Id] WHERE [User].[Id] = @UserId AND [AccessRight].[Name] = @Action",
    
    // AccessRightQueries   
    "q00x001":"SELECT TOP 1 [Name] FROM [dbo].[AccessRight] WHERE [Name] = @Name AND [Id] <> @Id",
    "q01x001":"SELECT [AccessRight].*, CONCAT([DeletedBy].[Firstname],' ', [DeletedBy].[Lastname]) AS [DeletedByUser], CONCAT([CreatedBy].[Firstname],' ',[CreatedBy].[Lastname]) AS [CreatedByUser], CONCAT([UpdatedBy].[Firstname],' ',[UpdatedBy].[Lastname]) AS [UpdatedByUser] FROM [dbo].[AccessRight] LEFT JOIN [User] AS [DeletedBy] ON [DeletedBy].[Id] = [AccessRight].[DeletedBy] LEFT JOIN [User] AS [CreatedBy] ON [CreatedBy].[Id] = [AccessRight].[CreatedBy] LEFT JOIN [User] AS [UpdatedBy] ON [UpdatedBy].[Id] = [AccessRight].[UpdatedBy] WHERE [AccessRight].[IsDeleted] = 0",
    
    // ClientQueries    
    "q04x001":"SELECT * FROM [dbo].[Client] WHERE IsDeleted = 0",
    "q04x002":"SELECT TOP 1 [Name] FROM [dbo].[Client] WHERE [Name] = @Name AND [Id] <> @Id",
    "q04x003":"SELECT * FROM [dbo].[ClientLine] WHERE [ClientId] = @ClientId",

    // DepartmentQueries    
    "q06x001":"SELECT * FROM [dbo].[Department] WHERE IsDeleted = 0",

    // NotificaitonQueries    
    "q08x001":"SELECT * FROM [dbo].[Notification] WHERE UserId = @UserId",

    // PermissionQueries    
    "q09x001":"SELECT [Permission].* FROM [dbo].[Permission] LEFT JOIN [dbo].[User] ON [User].[RoleId] = [Permission].[RoleId] WHERE [User].[Id] = @UserId",
    "q09x002":"SELECT [Id] FROM [dbo].[Permission] WHERE [Id] <> @Id AND [RoleId] = @RoleId AND [AccessRightId] = @AccessRightId",
    
    // RoleQueries  
    "q010x001":"SELECT [AccessRightId] FROM [dbo].[Permission] WHERE RoleId = @RoleId",
    
    // UserQueries  
    "q014x001":"SELECT * FROM [dbo].[AuditTrail] WHERE UserId = @UserId",
    "q014x002":"SELECT * FROM [dbo].[User] WHERE Username = @Username",
    "q014x003":"SELECT [Username] FROM [dbo].[User] WHERE Username = @Username AND Id <> @Id",
    "q014x004":"SELECT * FROM [dbo].[User] WHERE IsDeleted = 0",
    "":""
}

