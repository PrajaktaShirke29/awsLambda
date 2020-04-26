const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'});

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.put({
    TableName: 'td_notes_sdk',
    Item: {
        user_id: '123',
        timestamp: 2,
        title: 'Title rocks it',
        content: 'This is contain of 123'
    },
    ConditionExpression: '#t <> :t',
    ExpressionAttributeNames: {
        '#t': 'timestamp'
    },
    ExpressionAttributeValues: {
        ':t' : 2
    }
}, (err, data) => {
    if(err){
        console.log(err);
    } else {
        console.log(data);
    }
})