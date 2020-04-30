exports.handler = async (event) => {
    let result;
    let {operand1, operand2} = event.input;
    switch(event.operation){
        case "add":
            result = operand1 + operand2;
            break;
        
        case "sub":
            result = operand2 - operand1;
            break;
            
        case "div":
            result = operand1 / operand2;
            break;
            
        case "mult":
            result = operand1 * operand2;
            break;
            
        default:
            result = null;
            
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
};
