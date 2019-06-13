const fs = require('fs');
const { buildSchema } = require('./buildSchema');

const awsTypes = `
scalar AWSDate
scalar AWSTime
scalar AWSDateTime
scalar AWSTimestamp
scalar AWSEmail
scalar AWSJSON
scalar AWSURL
scalar AWSPhone
scalar AWSIPAddress
`;

let schemaFile = buildSchema('/testSchema.graphql');

fs.appendFileSync(schemaFile, awsTypes);
