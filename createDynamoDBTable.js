const AWS = require('./aws');

const dynamoDB = new AWS.DynamoDB();

const createProductTaxonomyTable = () => {
    const params = {
        TableName: 'ProductTaxonomyAttributes',
        KeySchema: [
            { AttributeName: 'taxonomyId', KeyType: 'HASH' } // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: 'taxonomyId', AttributeType: 'S' }, // String attribute
            { AttributeName: 'name', AttributeType: 'S' }, // String attribute
            { AttributeName: 'parentId', AttributeType: 'S' } // String attribute for secondary index
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        },
        GlobalSecondaryIndexes: [
            {
                IndexName: 'ParentIndex', // Index name
                KeySchema: [
                    { AttributeName: 'parentId', KeyType: 'HASH' }, // Index partition key
                    { AttributeName: 'name', KeyType: 'RANGE' } // Sort key
                ],
                Projection: {
                    ProjectionType: 'ALL' // Include all attributes in the index
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            }
        ]
    };

    dynamoDB.createTable(params, (err, data) => {
        if (err) {
            console.error('Unable to create ProductTaxonomyAttributes table. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Created ProductTaxonomyAttributes table. Table description JSON:', JSON.stringify(data, null, 2));
        }
    });
};

const createProductsTable = () => {
    const params = {
        TableName: 'Products',
        KeySchema: [
            { AttributeName: 'productId', KeyType: 'HASH' } // Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: 'productId', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };


    dynamoDB.createTable(params, (err, data) => {
        if (err) {
            console.error('Unable to create Products table. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Created Products table. Table description JSON:', JSON.stringify(data, null, 2));
        }
    });
};

module.exports  = createDynamoDBTable = () => {
    createProductTaxonomyTable();
    createProductsTable();
}

