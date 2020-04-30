var messages = [
    "Hello World",
    "Hello Serverless",
    "Get Started",
    "Lets Go",
    "Rock It",
    "Made it easy",
    "I can do it",
    "Let's do it together",
    "Do It by yourself"
];

exports.handler = async (event) => {
   let message = messages[Math.floor(Math.random() * 10)];
    // TODO implement
    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify('Hello from Lambda!'),
    // };
    return message;
};
