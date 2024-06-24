# USAGE of Get Class
- [x] Get Record By Table
- [x] Tested & Working
```
    // instanciate the Class [Get]
    import { Get } from /path of the class/

    // sample usage
    (
        async() => {
            // sample data
            const SampleTableName = 'AccessRight';

            // take note TableName is required
            const SampleRecord = await Get.recordByTable(SampleTableName );
            console.log(SampleRecord);

            // expected output
            SampleRecord = [
                 {
                    Id: 7,
                    Name: "Sample"
                    Description: "Sample Data",
                    CreatedBy:  1,
                    DateCreated: 2024-05-03,
                }
                {
                    Id: 8,
                    Name: "Sample"
                    Description: "Sample Data",
                    CreatedBy:  1,
                    DateCreated: 2024-05-03,
                }
            ]
           
        }
    )();

    // This function can be use to display all data of a table. Such as listing
```

- [x] Get Record By Id
- [x] Tested & Working
```
    // instanciate the Class [Get]
    import { Get } from /path of the class/

    // sample usage
    (
        async() => {

            // sample data
            const SampleId = 7;
            const SampleTableName = 'AccessRight';

            // take note Id and TableName are required
            const SampleRecord = await Get.recordById(SampleId, SampleTableName );
            console.log(SampleRecord);

            // expected output
            SampleRecord = {
                Id: 7,
                Name: "Sample"
                Description: "Sample Data",
                CreatedBy:  1,
                DateCreated: 2024-05-03,
            }
        }
    )();
    
    // This function can be use to display the details of a record. Such as profile
```

- [x] Get Record By Fields
- [x] Tested & Working
```
    // instanciate the Class [Get]
    import { Get } from /path of the class/

    // sample usage
    (
        async() => {
            // sample data
            const SampleQuery = 'SELECT [Name] FROM [AccessRight] WHERE Id = @Id';
            const SampleField = ['Id'];
            const SampleType = [ Int ]; // import Int from mssql
            const SampleValue = [7]

            // take note all of the parameters are requried
            const SampleRecord = await Get.recordById(SampleId, SampleTableName );
            console.log(SampleRecord);

            // expected output
            SampleRecord = {
                Id: 7,
                Name: "Sample"
                Description: "Sample Data",
                CreatedBy:  1,
                DateCreated: 2024-05-03,
            }
        }
    )();
    
    // This function can be use to display the details of a record. Such as profile
```