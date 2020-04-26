const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'});

const docClient = new AWS.DynamoDB.DocumentClient();

// docClient.get({
//     TableName: 'td_notes_sdk',
//     Key: {
//         user_id: '123',
//         timestamp: 1
//     }
// }, (err, data) => {
//     if(err) {
//         console.log(err);
//     }
//     else{
//         console.log(data);
//     }
// })

// docClient.query({
//     TableName: 'td_notes_sdk',
//     KeyConditionExpression: 'user_id = :id',
//     ExpressionAttributeValues: {
//         ':id': '123'
//     }
// }, (err, data) => {
//     if(err) {
//         console.log(err);
//     }
//     else{
//         console.log(data);
//     }
// })

// docClient.scan({
//     TableName: 'td_notes_sdk',
//     FilterExpression: 'title = :t',
//     ExpressionAttributeValues: {
//         ':t': 'Title rocks'
//     }
// }, (err, data) => {
//     if(err) {
//         console.log(err);
//     }
//     else{
//         console.log(data);
//     }
// })

docClient.batchGet({
    RequestItems:{
        'td_notes_sdk': {
            Keys: 
                [
                    {
                        user_id: '123',
                        timestamp: 1
                    },
                    {
                        user_id: '123',
                        timestamp: 2
                    }
                ],
        },
        'td_notes': {
            Keys: [
                {
                    timestamp: 1587902796,
                    user_id: 'rajta43'

                }
            ]
        }
    }
}, (err, data) => {
    if(err){
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
})