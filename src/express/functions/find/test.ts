import { isFound, findByFields } from '.'

export const test_isFound = async () => {
    try {
        console.log('\nFUNCTION TEST [isFound]: STARTING ... \n');
        console.log('.');
        console.log('.');
        let count = 0;

        // Write test cases here
        
        // result
        console.log('\nFUNCTION TEST: isFound');
        console.log(`PASSED: [${count}/3]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: isFound Error : ${error}`);
    }
}

export const test_findByFields = async () => {
    try {
        console.log('\nFUNCTION TEST [findByFields]: STARTING ... \n');
        console.log('.');
        console.log('.');
        let count = 0;

        // Write test cases here
        
        // result
        console.log('\nFUNCTION TEST: findByFields');
        console.log(`PASSED: [${count}/3]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: findByFields Error : ${error}`);
    }
}