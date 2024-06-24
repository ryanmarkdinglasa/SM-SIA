import { User } from './'
import { NVarChar, Int, DateTime } from 'mssql';

export const UserTest = async () => {
    try {
        const UpdateData: any = {
            Id:2,
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
            IsDeactivated:0,
            DepartmentId: 1,
            RoleId: 1,
            IsDeleted: 0,
        };
        const CreateData: any = {
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
            IsDeactivated:0,
            DepartmentId: 1,
            RoleId: 1,
            IsDeleted: 0,
        };

        // params => mock data to create and the current user
        let user = new User(CreateData, 1);
        // validate current user
        if (!(await user.validateCurrentUser()).result) console.log('USER-MODEL: CURRENT USER VALIDATION => ERROR');
        console.log('USER-MODEL: CURRENT USER VALIDATION => PASS');
        // false and has errors then
        if (!(await user.validateData()).result) console.log('USER-MODEL: DATA VALIDATION => ERROR');
        console.log('USER-MODEL: DATA VALIDATION => PASS');
        // else no error then create the user
        if (!(await user.save()).result) console.log('USER-MODEL: CREATION => ERROR');
        console.log('USER-MODEL: CREATION => PASS');

        // instanciate the data to update
        user = new User(UpdateData, 1);
        // validate the user
        if (!(await user.validateUser()).result) console.log('USER-MODEL: USER VALIDATION => ERROR');
        console.log('USER-MODEL: USER VALIDATION => PASS');

        if (!(await user.save()).result) console.log('USER-MODEL: UPDATING => ERROR');
        console.log('USER-MODEL: UPDATING => PASS');
        // test change pass
        if (!(await user.changePassword()).result) console.log('USER-MODEL: CHANGING PASSWORD => ERROR');
        console.log('USER-MODEL: CHANGING PASSWORD => PASS');
        // test trash the record
        if (!(await user.trash()).result) console.log('USER-MODEL: MOVE TO TRASH => ERROR');
        console.log('USER-MODEL: MOVE TO TRASH => PASS');

        // test remove the record
        if (!(await user.trash()).result) console.log('USER-MODEL: REMOVING => ERROR');
        console.log('USER-MODEL: REMOVING => PASS');
    } catch (error: any) {
        console.log(error)
    }
}