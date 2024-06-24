import { isDefaultRecord } from './';

export const test_isDefaultRecord = async () => {
    try {
        console.log('\nFUNCTION TEST [isDefaultRecord]: STARTING ... \n');
        console.log('.');
        console.log('.');
        let count = 0;
        // TestCase #1: If inputted table that has no default record it should return false
        const tc1 = await isDefaultRecord(3, 'testingni');
        if (!tc1) {
            count++;
            console.log(`[✔] If inputted table that has no default record it should return false => PASS`);
        }
        else console.log(`[x] If inputted table that has no default record it should return false => ERROR`);

        // TestCase #2: It should return false, If table is undefined
        const tc2 = await isDefaultRecord(1, undefined);
        if (!tc2) {
            count++;
            console.log(`[✔] It should return false, If table is undefined => PASS`);
        }
        else console.log(`[x] It should return false, If table is undefined => ERROR`);
        
        // TestCase #3: It should return false, If table is correct but the Id is zero (0)
        const tc3 = await isDefaultRecord(0, 'User');
        if (!tc3) {
            count++;
            console.log(`[✔] It should return false, If table is correct but the Id is zero (0) => PASS`);
        }
        else console.log(`[x] It should return false, If table is correct but the Id is zero (0) => ERROR`);
        
        // TestCase #4: It should return true, the params are correct
        const tc4 = await isDefaultRecord(1, 'User');
        if (tc4) {
            count++;
            console.log(`[✔] It should return true, the params are correct => PASS`);
        }
        else console.log(`[x] It should return true, the params are correct => ERROR`);
        
        
        // result
        console.log('\nFUNCTION TEST: isDefaultRecord');
        console.log(`PASSED: [${count}/4]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: isDefaultRecord Error : ${error}`);
    }
}
