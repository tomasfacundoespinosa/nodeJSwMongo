// App.js
const { MongoClient } = require('mongodb');   

const url = 'mongodb://localhost:27017';
const dbName = 'Sakila';

async function queryCustomers() {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const customers = await db.collection('customer')
      .aggregate([
        {
          $project: {
            _id: 0,
            Tienda: "$store_id",
            Nombre: "$first_name",
            Apellido: "$last_name"
          }
        },
        {
          $sort: {
            Apellido: -1
          }
        }
      ]).toArray();

    console.log(customers);
    client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

queryCustomers();