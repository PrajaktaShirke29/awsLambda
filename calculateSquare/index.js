const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
var lambda = new AWS.Lambda();

// reused the calculator container for multiple 
exports.handler= async (event) => {
    let number = event.number;
    let payload = JSON.stringify({
        operation: 'mult',
        input: {
            operand1: number,
            operand2: number
        }
    });
    
    let params = {
        FunctionName: "mathCalculator",
        InvocationType: "RequestResponse",
        Payload: payload
    }
    
    let data = await lambda.invoke(params).promise();
    let result = JSON.parse(data.Payload);
    
    return result.body;
};
