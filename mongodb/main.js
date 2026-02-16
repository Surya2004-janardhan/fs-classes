// lets connect mongodb with nodejs and write raw queries without using any framework and also we ll use all the topics of mongodb like indexing, aggregation, replication, sharding, transactions, etc

const { MongoClient } = require("mongodb");
// connection url
const url = "mongodb://localhost:27017";
// database name
const dbName = "practice-db";
// create a new MongoClient
const client = new MongoClient(url);

async function main() {
  try {
    // connect to the MongoDB server
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    const db = client.db(dbName);

    // let's create a collection and insert some documents
    const collection = db.collection("users");
    await collection.insertMany([
      { name: "Alice", age: 30, city: "New York" },
      { name: "Bob", age: 25, city: "Los Angeles" },
      { name: "Charlie", age: 35, city: "Chicago" },
    ]);
    console.log("Inserted documents into the collection");

    // let's find all documents in the collection
    const users = await collection.find({}).toArray();
    console.log("All users:", users);
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

main();
