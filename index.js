const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const taxonomyRoutes = require('./routes/taxonomyRoutes');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use('/api', productRoutes);
app.use('/api', taxonomyRoutes);

// Create Products table when starting the server in background

// uncomment below line to run a express server
//const createDynamoDBTable = require('./createDynamoDBTable');
// createDynamoDBTable();
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

module.exports = app;