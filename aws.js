const AWS = require('aws-sdk');
// This configuration can be managed by lambda variable or by giving right permission to role used to create lambda
AWS.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'us-east-2' // Specify your AWS region
});

module.exports = AWS;
