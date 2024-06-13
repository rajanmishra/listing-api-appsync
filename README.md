# listing-api-appsync

## Ecommerce Service (product and category) Deployment Guide
This guide provides steps to deploy and run the Ecommerce Service using the Serverless Framework with AWS AppSync.

##Prerequisites
Node.js installed (version 18.x or higher)
AWS CLI configured with appropriate permissions
Serverless Framework installed (npm install -g serverless)
Getting Started


1. Clone the repository:

    ```
    git clone https://github.com/rajanmishra/listing-api-appsync.git
    cd listing-api-appsync
    ```

2. Install dependencies:

    ```
    npm install -g serverless
    npm install
    ```


3. Set up AWS credentials:

    ```aws configure```


4. Deploy the service:

   ```serverless deploy```


5. check deployment.yml and deploy.sh and serverless.yml for CI/CD and production deployment


## Folder Structure
src/: Contains the Lambda function code and resolver templates.
serverless.yml: Serverless configuration file defining AWS resources and functions.


## Usage
After successful deployment, you can use the Ecommerce Service API and AWS AppSync.

##Using REST API
Obtain the API key from the AWS API Gateway console.
Use the API key in your API requests as a header (e.g., x-api-key: your-api-key).
Example API endpoints: Ecommerce.postman_collection.json
Environment Variable for postman
```
    graphqlapikey
    graphqlhost
    resthost
    apikey
```

```
    GET /products: Retrieve all products.
    POST /products: Create a new product.
```
### Refer to the API documentation for detailed usage instructions.

## Using GraphQL API (AppSync)
Access the AWS AppSync console.
Obtain the GraphQL endpoint URL and API key from the "Settings" tab.
Use the API key in your GraphQL requests as a header (e.g., x-api-key: your-api-key).
Example GraphQL queries:

Retrieve a product:

```
    query GetProduct($productId: ID!) {
    getProduct(productId: $productId) {
        productId
        name
        description
        price
    }
    }
```


Create a new product:

```
    mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
        productId
        name
        description
        price
    }
    }
```


## Cleanup
To remove the deployed service and associated resources:

```serverless remove```



## Additional Notes
Make sure to secure and manage your API keys properly.
Monitor AWS usage to avoid unnecessary costs.
Refer to AWS AppSync documentation for advanced GraphQL features and configurations.
