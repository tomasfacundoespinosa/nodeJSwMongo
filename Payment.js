// App.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'Sakila';

async function queryPayments() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);

        const payments = await db.collection('payment')
            .find({})
            .toArray();

        console.log(payments);
        client.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

queryPayments();