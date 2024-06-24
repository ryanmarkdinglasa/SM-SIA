import { generateRefreshToken, generateToken } from '.'

export const test_generateToken = async () => {
    try {
        console.log('\nFUNCTION TEST [generateToken]: STARTING ... \n');
        console.log('.');
        console.log('.');
        let count = 0;

        // Write test cases here
        
        // result
        console.log('\nFUNCTION TEST: generateToken');
        console.log(`PASSED: [${count}/3]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: generateToken Error : ${error}`);
    }
}

export const test_generateRefreshToken = async () => {
    try {
        console.log('\nFUNCTION TEST [generateRefreshToken]: STARTING ... \n');
        console.log('.');
        console.log('.');
        let count = 0;

        // Write test cases here
        
        // result
        console.log('\nFUNCTION TEST: generateRefreshToken');
        console.log(`PASSED: [${count}/3]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: generateRefreshToken Error : ${error}`);
    }
}

