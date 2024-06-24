import { User } from '.'; // Adjust the import path as needed
import { UserSchema } from '../../schemas';
import { conn } from '../../config'; // Import database connection function
import { ConnectionPool, Request } from 'mssql';
import { SUCCESS, ERROR } from '../../shared';
import { hashPassword } from '../../functions';
jest.mock('../../../src/config', () => ({
    conn: jest.fn()
}));

describe('User class', () => {
    let mockRequest: Partial<Request>;
    let mockPool: Partial<ConnectionPool>;

    beforeEach(() => {
        mockRequest = {
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: [1] }),
        };
        mockPool = {
            request: jest.fn().mockReturnValue(mockRequest as Request),
            setMaxListeners: jest.fn()
        };
        (conn as jest.Mock).mockResolvedValue(mockPool as ConnectionPool);
    });

    const mockUserData = {
        Id: 1,
        Username: 'testuser',
        Password: 'password123',
        Firstname: 'Test',
        Middlename: 'T',
        Lastname: 'User',
        Gender: 'M',
        Birthdate: new Date('1990-01-01'),
        Address: '123 Test St',
        ContactNumber: '1234567890',
        Image: 'image.png',
        DepartmentId: 1,
        RoleId: 1,
        IsDeactivated: 0,
        IsDeleted: 0,
        DeletedBy: null,
        CreatedBy: 1,
        UpdatedBy: null,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('validate method returns false on schema validation error', async () => {
        const user = new User(mockUserData, 2);
        (UserSchema.validate as jest.Mock) = jest.fn().mockReturnValue({ error: new Error('Validation Error') });
        const result:any = await user.validate();
        expect(result.result).toEqual(false);
    });
    
    test('validate method returns false if UserId is not set', async () => {
        const user = new User(mockUserData);
        const result:any =  await user.validate();
        expect(result).toEqual({ result: false });
    });

    test('validate method returns true on successful validation', async () => {
        const user = new User(mockUserData, 1);
        //(UserSchema.validate as jest.Mock).mockReturnValue({ error: null });
        const result:any = user.validate();
        expect(result).toEqual({  result: true });
    });
    test('save method returns error if updating default record', async () => {
        const user = new User({ ...mockUserData, Id: 1 });


        const result = await user.save();
        expect(result).toEqual({ message: ERROR.e00x10, result: false });
    });

    test('save method handles errors correctly', async () => {
        const user = new User(mockUserData);
        (hashPassword as jest.Mock).mockRejectedValue(new Error('Hashing Error'));

        const result = await user.save();
        expect(result).toEqual({ message: 'Hashing Error', result: false });
    });
});

/*
     

        

   

    test('save method creates new user record', async () => {
        const create = {
            Username: 'testuser',
            Password: 'password123',
            Firstname: 'Test',
            Middlename: 'T',
            Lastname: 'User',
            Gender: 'M',
            Birthdate: new Date('1990-01-01'),
            Address: '123 Test St',
            ContactNumber: '1234567890',
            Image: 'image.png',
            IsDeactivated:1,
            DepartmentId: 1,
            RoleId: 1,
            IsDeleted: 0,
        };
        let result:any;
        const user = new User(create, 1);
        if (await user.validate()) result = await user.save();
        expect(result).toEqual({ message: SUCCESS.s00x02, result: true });
    });

    

    test('save method returns error if user record with username exists', async () => {
        const user = new User(mockUserData);
        (hashPassword as jest.Mock).mockResolvedValue('hashedpassword');
        (generateCode as jest.Mock).mockResolvedValue('generatedCode');
        (isFound as jest.Mock).mockResolvedValue(true);

        const result = await user.save();
        expect(result).toEqual({ message: ERROR.e00x06, result: false });
    });

    test('save method updates existing user record', async () => {
        const user = new User({ ...mockUserData, Id: 1 });
        (hashPassword as jest.Mock).mockResolvedValue('hashedpassword');
        (findByFields as jest.Mock).mockResolvedValue(false);
        (isDefaultRecord as jest.Mock).mockResolvedValue(false);
        (Update.record as jest.Mock).mockResolvedValue(true);

        const result = await user.save();
        expect(hashPassword).toHaveBeenCalledWith('password123');
        expect(findByFields).toHaveBeenCalledWith(QUERY.q014x003, ['Username', 'Id'], [NVarChar(255), Int], ['testuser', 1]);
        expect(isDefaultRecord).toHaveBeenCalledWith(1, TABLE.t014);
        expect(Update.record).toHaveBeenCalled();
        expect(result).toEqual({ message: SUCCESS.s00x04, result: true });
    });

    test('save method returns error if username already exists for another record', async () => {
        const user = new User({ ...mockUserData, Id: 1 });
        (hashPassword as jest.Mock).mockResolvedValue('hashedpassword');
        (findByFields as jest.Mock).mockResolvedValue(true);

        const result = await user.save();
        expect(result).toEqual({ message: ERROR.e00x27, result: false });
    });

    

*/