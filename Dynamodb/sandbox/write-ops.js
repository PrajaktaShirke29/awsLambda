const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});

const docClient = new AWS.DynamoDB.DocumentClient();

// create new item
// docClient.put({
//     TableName: 'td_notes_sdk',
//     Item: {
//         user_id: 'aa12',
//         timestamp: 2,
//         title: 'My wishes',
//         content: 'All Wishes will be listed'
//     }
// }, (err, data) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

// Update title
// docClient.update({
//     TableName: 'td_notes_sdk',
//     Key: {
//         user_id: 'aa11',
//         timestamp: 1
//     },
//     UpdateExpression: 'set #t = :t',
//     ExpressionAttributeNames: {
//         '#t': 'title'
//     },
//     ExpressionAttributeValues: {
//         ':t': 'Updated Title'
//     }
// }, (err, data) => {
//     if(err) {
//         console.log(err);
//     }else {
//         console.log(data);
//     }
// })

// Delete Item
// docClient.delete({
//     TableName: 'td_notes_sdk',
//     Key: {
//         user_id: 'aa11',
//         timestamp: 1
//     }
// }, (err, data) => {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

docClient.batchWrite({
    RequestItems: {
        'td_notes_sdk': [
            {
                DeleteRequest: {
                    Key: {
                        user_id: 'aa12',
                        timestamp: 2
                    }
                },
            },
            {
                PutRequest: {
                    Item: {
                        user_id : 'abc13',
                        timestamp: 1,
                        title: 'Title of abc13',
                        content: 'Content of abc13'
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        user_id: 'abc14',
                        timestamp: 1,
                        title: 'Title of abc14',
                        content: 'Content of abc14'
                    }
                }
            }
        ]
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
})