const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const app = express();

const SERVER_PORT = 4000;

const dbConfig = require('./app/config/dg-config.js');

// const Transactions = require('./app/models/transactions.model.js');
// const Customers = require('./app/models/customers.model.js');
// const Bank_Details = require('./app/models/bank_details.model.js');

const route = require('./app/route/route.js');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Successfully connected to the database !!!!');
}).catch(err => {
    console.log('Database Error - ', err);
    process.exit();
});

app.use('/api', route);

process.on('uncaughtException', (ex) => {
    console.log('Ex------------', ex);
});

app.listen(SERVER_PORT, () => {
    console.log(`Financial Server Running On Port :: ${SERVER_PORT}`);
});