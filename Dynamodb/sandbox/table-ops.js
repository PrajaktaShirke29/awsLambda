const Aws = require('aws-sdk');
Aws.config.update({region: 'us-east-2'});

const dynamodb = new Aws.DynamoDB();

// list tables in dynamodb
// dynamodb.listTables({}, (err, data) => {
//     if(err)  {
//         console.log(err);
//     }else {
//         console.log(data);
//     }
// })

// output : { TableNames: [ 'td_notes' ] }

// DESC
// dynamodb.describeTable({
//     TableName: 'td_notes_sdk'
// }, (err, data) => {
//     if(err)  {
//         console.log(err);
//     }else {
//         console.log(JSON.stringify(data, null, 2));
//     }
// })

// Create Table
dynamodb.createTable({
    TableName:'td_notes_sdk',
    AttributeDefinitions:[
        {
            AttributeName: 'user_id',
            AttributeType: 'S'
        },
        {
            AttributeName: 'timestamp',
            AttributeType: 'N'
        }
    ],
    KeySchema:[
        {
            AttributeName: 'user_id',
            KeyType: "HASH"
        },
        {
            AttributeName: 'timestamp',
            KeyType: "RANGE"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits:1,
        WriteCapacityUnits: 1
    }
}, (err, data) => {
    if(err)  {
        console.log(err);
    }else {
        console.log(JSON.stringify(data, null, 2));
    }
})

//update RCU 
// dynamodb.updateTable({
//     TableName: 'td_notes_sdk',
//     ProvisionedThroughput:{
//         ReadCapacityUnits: 2,
//         WriteCapacityUnits: 1
//     }
// },(err, data) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(data, null, 2));
//     }
// })

// Delete Table
// dynamodb.deleteTable({
//     TableName: 'td_notes_sdk'
// }, (err, data) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })