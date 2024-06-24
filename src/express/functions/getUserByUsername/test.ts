import { getUserByUsername } from './'

export const test_getUserByUsername = async () => {
    try {
        console.log('\nFUNCTION TEST [getUserByUsername]: STARTING ... \n');
        console.log('.');
        console.log('.');
        let count = 0;
        // TestCase #1: It should return the user's username
        const tc1 = await getUserByUsername('superuser');
        if (tc1.Username === 'superuser') {
            count++;
            console.log(`[✔] It should return the user's username => PASS`);
        }
        else console.log(`[x] It should return the user's username => ERROR`);

        // TestCase #2: It should return a null value if the users username is not found
        const tc2 = await getUserByUsername('superuser33');
        if (tc2.Username === undefined) {
            count++;
            console.log(`[✔] It should return a [ ] value if the users username is not found => PASS`);
        }
        else console.log(`[x] It should return a [ ] value if the users username is not found => ERROR`);

        // TestCase #3: It should return a null value if the users username is undefined
        const tc3 = await getUserByUsername(undefined);
        if (tc3.Username === undefined) {
            count++;
            console.log(`[✔] It should return a [ ] value if the users username is undefined=> PASS`);
        }
        else console.log(`[x] It should return a [ ] value if the users username is undefined => ERROR`);

        // result
        console.log('\nFUNCTION TEST: getUserByUsername');
        console.log(`PASSED: [${count}/3]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: getUserByUsername Error : ${error}`);
    }
}

