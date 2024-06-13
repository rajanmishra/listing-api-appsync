const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'us-east-2' // Specify your AWS region
});

module.exports = AWS;