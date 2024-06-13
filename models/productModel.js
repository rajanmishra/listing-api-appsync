const AWS = require('../aws');
const { v4: uuidv4 } = require('uuid');


const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'Products';

const Product = {
    create: async (productData) => {
       const productId =  uuidv4();
        const params = {
            TableName: tableName,
            Item: {
                productId,
                name: productData.name,
                description: productData.description,
                price: productData.price,
                category: productData.category,
                stock: productData.stock,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        };
    
        await dynamoDB.put(params).promise();
        return { productId };
    },

    get: async (productId) => {
        const params = {
            TableName: tableName,
            Key: {
                productId
            }
        };

        const data = await dynamoDB.get(params).promise();
        return data.Item;
    },

    update: async (productId, productData) => {
        // const queryParams = {
        //     TableName: tableName,
        //     Key: {
        //         productId
        //     }
        // };

        // const record = await dynamoDB.get(queryParams).promise();
        // if(!record.Item){
        //     return { message: 'Product doen\'t not exist.' };
        // }

        const params = {
            TableName: tableName,
            Key: { productId },
            UpdateExpression: 'set #n = :n, description = :d, price = :p, category = :c, stock = :s, updatedAt = :u',
            ExpressionAttributeNames: {
                '#n': 'name'
            },
            ExpressionAttributeValues: {
                ':n': productData.name,
                ':d': productData.description,
                ':p': productData.price,
                ':c': productData.category,
                ':s': productData.stock,
                ':u': new Date().toISOString()
            },
            ConditionExpression: 'attribute_exists(productId)',
            ReturnValues: 'UPDATED_NEW'
        };

        const data = await dynamoDB.update(params).promise();
        return data.Attributes;
    },

    delete: async (productId) => {
        const params = {
            TableName: tableName,
            Key: {
                productId
            }
        };

        await dynamoDB.delete(params).promise();
        return { message: 'Product deleted' };
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
    }
};

module.exports = Product;
