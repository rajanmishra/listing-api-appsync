const AWS = require('../aws');
const { v4: uuidv4 } = require('uuid');


const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'ProductTaxonomyAttributes';

const Taxonomy = {
    create: async (taxonomyData) => {
        const taxonomyId = uuidv4();
        const params = {
            TableName: tableName,
            Item: {
                taxonomyId,
                name: taxonomyData.name,
                description: taxonomyData.description,
                parentId: taxonomyData.parentId || 'root',
                type: taxonomyData.type
            }
        };

        await dynamoDB.put(params).promise();
        return { taxonomyId };
    },

    get: async (taxonomyId) => {
        const params = {
            TableName: tableName,
            Key: {
                taxonomyId
            }
        };

        const data = await dynamoDB.get(params).promise();
        return data.Item;
    },

    update: async (taxonomyId, taxonomyData) => {
        const params = {
            TableName: tableName,
            Key: { taxonomyId },
            UpdateExpression: 'set #n = :n, description = :d, parentId = :p, #t = :t',
            ExpressionAttributeNames: {
                '#n': 'name',
                '#t': 'type'
            },
            ExpressionAttributeValues: {
                ':n': taxonomyData.name,
                ':d': taxonomyData.description,
                ':p': taxonomyData.parentId || 'root',
                ':t': taxonomyData.type
            },
            ConditionExpression: 'attribute_exists(taxonomyId)',
            ReturnValues: 'UPDATED_NEW'
        };

        const data = await dynamoDB.update(params).promise();
        return data.Attributes;
    },

    delete: async (taxonomyId) => {
        const params = {
            TableName: tableName,
            Key: {
                taxonomyId
            }
        };

        await dynamoDB.delete(params).promise();
        return { message: 'Taxonomy deleted' };
    },

    list: async (limit, lastEvaluatedKey) => {
        const params = {
            TableName: tableName,
            Limit: limit,
            ExclusiveStartKey: lastEvaluatedKey
        };

        const data = await dynamoDB.scan(params).promise();
        return {
            items: data.Items,
            lastEvaluatedKey: data.LastEvaluatedKey
        };
    },

    listByParentId: async (parentId) => {
        const params = {
            TableName: tableName,
            IndexName: 'ParentIndex', // Secondary index name
            KeyConditionExpression: 'parentId = :parentId',
            ExpressionAttributeValues: {
                ':parentId': parentId
            }
        };

        const data = await dynamoDB.query(params).promise();
        return data.Items;
    }
};

module.exports = Taxonomy;
