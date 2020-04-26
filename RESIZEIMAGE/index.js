const im = require('imagemagick');
const fs = require('fs');
const os = require('os');
const { uuid } = require('uuidv4');
const { promisify } = require('util');
const AWS = require('aws-sdk');

const resizeAsync = promisify(im.resize);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

AWS.config.update({region: 'us-east-2'});
const s3 = new AWS.S3();

exports.handler = async (event) => {
    let fileProcessed = event.Records.map(async(record) => {
        let bucket = record.s3.bucket.name;
        let filename = record.s3.object.key;

        // Get file from S3
        var params= {
            Bucket: bucket,
            Key: filename
        };
        let inputData = await s3.getObject(params).promise();

        // Resize the file
        let tempFile=os.tmpdir()+ '/' + uuid()+'.jpg';
        let resizeArgs = {
            srcData: inputData.Body,
            dataPath: tempFile,
            width:150
        };
        await resizeAsync(resizeArgs);

        // Read the resized file
        let resizeData = await readFileAsync(tempFile);

        // upload the new file to s3
        let targetFilename= filename.substring(0, filename.lastIndexOf('.') )+'-small.jpg';
        var params = {
            Bucket:bucket + '-dest',
            Key: targetFilename,
            Body: new Buffer(resizeData),
            ContentType: 'image/jpeg'
        };

        await s3.putObject(params).promise();
        return await unlinkAsync(tempFile);

    });

    await Promise.all(fileProcessed);
    console.log('done');
    return "done";
};