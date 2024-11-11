// App.js
const { MongoClient } = require('mongodb');


const url = 'mongodb://localhost:27017';
const dbName = 'Sakila';

async function queryCustomers() {
  try {

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);


    const customers = await db.collection('customer').find(
      {},
      {
        projection: {
          store_id: 1,
          first_name: 1,
          last_name: 1,
          _id: 0
        }
      }
    ).toArray();


    console.log(customers);


    client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

queryCustomers();