import { encryptPassword, decryptPassword, comparePassword } from '.'

export const test_encryptPassword = async () => {
    try {
        console.log('\nFUNCTION TEST [encryptPassword]: STARTING ... \n');
        console.log('.');
        console.log('.');
        let count = 0;

        // Write test cases here
        
        // result
        console.log('\nFUNCTION TEST: encryptPassword');
        console.log(`PASSED: [${count}/3]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: encryptPassword Error : ${error}`);
    }
}

export const test_decryptPassword = async () => {
    try {
        console.log('\nFUNCTION TEST [decryptPassword]: STARTING ... \n');
        console.log('.');
        console.log('.');
        let count = 0;

        // Write test cases here
        
        // result
        console.log('\nFUNCTION TEST: decryptPassword');
        console.log(`PASSED: [${count}/3]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: decryptPassword Error : ${error}`);
    }
}

export const test_comparePassword = async () => {
    try {
        console.log('\nFUNCTION TEST [comparePassword]: STARTING ... \n');
        console.log('.');
        console.log('.');
        let count = 0;

        // Write test cases here
        
        // result
        console.log('\nFUNCTION TEST: comparePassword');
        console.log(`PASSED: [${count}/3]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: comparePassword Error : ${error}`);
    }
}