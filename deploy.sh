#!/bin/bash

# Set AWS credentials
export AWS_ACCESS_KEY_ID="your_access_key_id"
export AWS_SECRET_ACCESS_KEY="your_secret_access_key"
export AWS_REGION="us-east-1"

# Install Node.js dependencies
npm install -g serverless
npm install

# Deploy using Serverless Framework
serverless deploy --stage dev

# Print GraphQL URL and API key
echo "GraphQL URL:"
echo "https://your-appsync-api-id.appsync-api.your-region.amazonaws.com/graphql"
echo "API Key:"
echo "your-api-key"
