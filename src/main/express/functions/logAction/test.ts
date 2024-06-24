import { logUserAction } from '.'

export const test_logUserAction = async () => {
    try {
        console.log('\nFUNCTION TEST [logUserAction]: STARTING ... \n');
        console.log('.');
        console.log('.');
        let count = 0;

        // Write test cases here
        
        // result
        console.log('\nFUNCTION TEST: logUserAction');
        console.log(`PASSED: [${count}/3]`);

    } catch (error: any) {
        console.log(`FUNCTION TEST: logUserAction Error : ${error}`);
    }
}