const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

const encrypted = process.env['APP_SCRET'];
let decrypted;


function processEvent(event, context) {
    let log = event;
    
    log.lambdaFunction = context.functionName;
    log.lambdaVersion  = context.functionVersion;
    log.appname =  process.env.APP_NAME;
    log.appscret = encrypted;
    log.decryptScret = decrypted;
    //comment
    return log;
}

exports.handler = async (event, context) => {
    if (!decrypted) {
        // Decrypt code should run once and variables stored outside of the
        // function handler so that these are decrypted once per container
        const kms = new AWS.KMS();
        try {
            const req = { CiphertextBlob: Buffer.from(encrypted, 'base64') };
            const data = await kms.decrypt(req).promise();
            decrypted = data.Plaintext.toString('ascii');
        } catch (err) {
            console.log('Decrypt error:', err);
            throw err;
        }
    }
    return processEvent(event, context);
};
