exports.handler = async(event) => {
    let {num1, num2} = event.body;
    return {
        statusCode:200,
        body: {
            num1,
            num2,
            result: num1+num2
        }
    }
}