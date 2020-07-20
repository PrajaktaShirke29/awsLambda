exports.handler = async(event) => {
    let log = JSON.stringify(event);
    console.log(log);
    return {
        statusCode : 200,
        body: log
    }
}