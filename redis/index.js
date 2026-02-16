// lets connect redis and local sql db with nodejs so that we can knw how fast redis is when caching the data 2nd time

// lets build a basic express server with a basic api /test
// we ll connnect local sql db using mysql2 package and fetch the data from it and store it in redis cache

const mysql = require("mysql2/promise");
// the package needed to install above throu npm install mysql2
// lets create a connection to local sql db using mysql2 package
const dbConfig = {
  host: "localhost",
  user: "root",
  
  password: "root",
  database: "sqlclasses",
};

// lets connect to local sql db using mysql2 package and fetch the data from it
async function fetchDataFromDB() {
  const connection = await mysql.createConnection(dbConfig);
  const [rows, fields] = await connection.execute("SELECT * FROM students");
  await connection.end();
  return rows;
}

const express = require("express");

const app = express();

const redis = require("redis");

// use alread running redis server on localhost with default port 6379
const client = redis.createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => {
  console.log("Redis Client Error", err);
});
// lets connect to redis server using await
// windows has no redis windows server so you can use docker to run redis server on windows or you can use wsl to run redis server on windows

async function connectRedis() {
  await client.connect();
  console.log("Connected to Redis");
}

connectRedis();

app.get("/test", async (req, res) => {
  try {
    // lets check if the data is in redis cache or not
    const cacheData = await client.get("testData");
    if (cacheData) {
      console.log("Data from Redis Cache");
      return res.json({ data: JSON.parse(cacheData), source: "cache" });
    }

    // if data is not in cache then we will fetch it from local sql db and store it in redis cache
    const data = await fetchDataFromDB();

    // Redis stores strings, so arrays/objects should be stringified first.
    await client.setEx("testData", 60, JSON.stringify(data));

    console.log("Data from Local SQL DB");
    return res.json({ data, source: "db" });
  } catch (error) {
    console.error("Error in /test route:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// lets write other redis most followed commands in nodejs using redis package with proper json stringy because redis stores string data only

// 1. SET command with async function example

async function setData(key, value) {
  await client.set(key, JSON.stringify(value));
  console.log(`Data set for key: ${key}`);
}

// 2. GET command with async function example
async function getData(key) {
  const data = await client.get(key);
  if (data) {
    console.log(`Data retrieved for key: ${key}`);
    return JSON.parse(data);
  } else {
    console.log(`No data found for key: ${key}`);
    return null;
  }
}

// 3. DEL command with async function example
async function deleteData(key) {
  await client.del(key);
  console.log(`Data deleted for key: ${key}`);
}

// 4. EXPIRE command with async function example
async function setExpiration(key, seconds) {
  await client.expire(key, seconds);
  console.log(`Expiration set for key: ${key} with ${seconds} seconds`);
}

// 5. KEYS command with async function example
async function getKeys(pattern) {
  const keys = await client.keys(pattern);
  console.log(`Keys matching pattern "${pattern}":`, keys);
  return keys;
}

// 6. FLUSHALL command with async function example
async function flushAll() {
  await client.flushAll();
  console.log("All data flushed from Redis");
}

// expire commadands with set command example
async function setDataWithExpiration(key, value, seconds) {
  await client.setEx(key, seconds, JSON.stringify(value));
  console.log(`Data set for key: ${key} with expiration of ${seconds} seconds`);
}

// datatypes in redis are string, list, set, sorted set, hash, stream, hyperloglog, geospatial index and bitmaps. we can use these data types to store different types of data in redis. for example we can use list to store a list of items, set to store a unique set of items, sorted set to store a sorted set of items, hash to store a hash of key-value pairs, stream to store a stream of data, hyperloglog to store a probabilistic data structure for counting unique items, geospatial index to store geospatial data and bitmaps to store a bitmap of bits.

// lets write examples for each data type in redis using redis package in nodejs

// 1. String datatype example
async function setString(key, value) {
  await client.set(key, value);
  console.log(`String set for key: ${key}`);
}
async function getString(key) {
  const value = await client.get(key);
  console.log(`String retrieved for key: ${key}: ${value}`);
  return value;
}

// 2. List datatype example
async function pushToList(key, value) {
  await client.rPush(key, value);
  console.log(`Value pushed to list for key: ${key}`);
}
async function getList(key) {
  const list = await client.lRange(key, 0, -1);
  console.log(`List retrieved for key: ${key}:`, list);
  return list;
}
// 3. Set datatype example
async function addToSet(key, value) {
  await client.sAdd(key, value);
  console.log(`Value added to set for key: ${key}`);
}
async function getSet(key) {
  const set = await client.sMembers(key);
  console.log(`Set retrieved for key: ${key}:`, set);
  return set;
}
// 4. Sorted Set datatype example
async function addToSortedSet(key, score, value) {
  await client.zAdd(key, { score, value });
  console.log(`Value added to sorted set for key: ${key} with score: ${score}`);
}
async function getSortedSet(key) {
  const sortedSet = await client.zRangeWithScores(key, 0, -1);
  console.log(`Sorted set retrieved for key: ${key}:`, sortedSet);
  return sortedSet;
}
// 5. Hash datatype example
async function setHash(key, field, value) {
  await client.hSet(key, field, value);
  console.log(`Hash field set for key: ${key}, field: ${field}`);
}
async function getHash(key, field) {
  const value = await client.hGet(key, field);
  console.log(
    `Hash field retrieved for key: ${key}, field: ${field}: ${value}`,
  );
  return value;
}
// 6. Stream datatype example
async function addToStream(key, value) {
  await client.xAdd(key, "*", value);
  console.log(`Value added to stream for key: ${key}`);
}

async function getStream(key) {
  const stream = await client.xRange(key, "-", "+");
  console.log(`Stream retrieved for key: ${key}:`, stream);
  return stream;
}

// now img files others with redis using redis package in nodejs we can use redis to store binary data like images, files, etc. we can use the set command to store the binary data as a string in redis. we can also use the get command to retrieve the binary data from redis and convert it back to its original form.
const fs = require("fs");
async function setBinaryData(key, filePath) {
  const fileData = fs.readFileSync(filePath);
  await client.set(key, fileData);
  console.log(`Binary data set for key: ${key} from file: ${filePath}`);
}
async function getBinaryData(key, outputPath) {
  const fileData = await client.getBuffer(key);
  fs.writeFile;
  Sync(outputPath, fileData);

  console.log(
    `Binary data retrieved for key: ${key} and saved to file: ${outputPath}`,
  );
}

// now most commonly used redis commands with redis package in nodejs

// 1. PING command example
async function pingRedis() {
  const response = await client.ping();
  console.log(`PING response: ${response}`);
}
// 2. EXISTS command example
async function checkKeyExists(key) {
  const exists = await client.exists(key);
  console.log(`Key "${key}" exists: ${exists === 1}`);
}
// 3. TTL command example
async function getKeyTTL(key) {
  const ttl = await client.ttl(key);
  console.log(`TTL for key "${key}": ${ttl} seconds`);
}
// 4. INCR command example
async function incrementKey(key) {
  const newValue = await client.incr(key);
  console.log(`Value for key "${key}" incremented to: ${newValue}`);
}
// 5. DECR command example
async function decrementKey(key) {
  const newValue = await client.decr(key);
  console.log(`Value for key "${key}" decremented to: ${newValue}`);
}

// now large scale industry use cases of redis in nodejs

// 1. Caching: Redis is commonly used as a caching layer to store frequently accessed data, such as user sessions, product information, or API responses, to improve performance and reduce database load.
// 2. Real-time Analytics: Redis can be used to store and analyze real-time data, such as user activity, website traffic, or sensor data, to gain insights and make informed decisions.
// 3. Pub/Sub Messaging: Redis provides a publish/subscribe messaging system that allows different parts of an application to communicate with each other in real-time, making it suitable for chat applications, notifications, and event-driven architectures.
// 4. Leaderboards and Counters: Redis's sorted sets and atomic operations make it ideal for implementing leaderboards, counters, and ranking systems in gaming applications or social media platforms.
// 5. Session Management: Redis can be used to store user session data in web applications, allowing for fast retrieval and scalability across multiple servers.

// lets build basic async functions for above use cases of redis in nodejs

// 1. Caching example
async function cacheData(key, value, expiration) {
  await client.setEx(key, expiration, JSON.stringify(value));
  console.log(
    `Data cached for key: ${key} with expiration of ${expiration} seconds`,
  );
}
async function getCachedData(key) {
  const data = await client.get(key);
  if (data) {
    console.log(`Cached data retrieved for key: ${key}`);
    return JSON.parse(data);
  } else {
    console.log(`No cached data found for key: ${key}`);
    return null;
  }
}

// 2. Real-time Analytics example
async function trackUserActivity(userId, activity) {
  const key = `user:${userId}:activity`;
  await client.rPush(key, activity);
  console.log(`User activity tracked for userId: ${userId}`);
}
async function getUserActivity(userId) {
  const key = `user:${userId}:activity`;
  const activities = await client.lRange(key, 0, -1);
  console.log(`User activities retrieved for userId: ${userId}:`, activities);
  return activities;
}
// 3. Pub/Sub Messaging example
async function publishMessage(channel, message) {
  await client.publish(channel, message);
  console.log(`Message published to channel: ${channel}`);
}
async function subscribeToChannel(channel) {
  const subscriber = client.duplicate();
  await subscriber.connect();
  await subscriber.subscribe(channel, (message) => {
    console.log(`Message received on channel "${channel}": ${message}`);
  });
  console.log(`Subscribed to channel: ${channel}`);
}
// 4. Leaderboards and Counters example
async function updateLeaderboard(leaderboardKey, userId, score) {
  await client.zAdd(leaderboardKey, { score, value: userId });
  console.log(`Leaderboard updated for userId: ${userId} with score: ${score}`);
}
async function getLeaderboard(leaderboardKey, topN) {
  const leaderboard = await client.zRangeWithScores(
    leaderboardKey,
    0,
    topN - 1,
  );
  console.log(
    `Top ${topN} leaderboard retrieved for key: ${leaderboardKey}:`,
    leaderboard,
  );
  return leaderboard;
}
// 5. Session Management example
async function createSession(sessionId, sessionData, expiration) {
  await client.setEx(
    `session:${sessionId}`,
    expiration,
    JSON.stringify(sessionData),
  );
  console.log(
    `Session created for sessionId: ${sessionId} with expiration of ${expiration} seconds`,
  );
}
async function getSession(sessionId) {
  const sessionData = await client.get(`session:${sessionId}`);
  if (sessionData) {
    console.log(`Session data retrieved for sessionId: ${sessionId}`);
    return JSON.parse(sessionData);
  } else {
    console.log(`No session data found for sessionId: ${sessionId}`);
    return null;
  }
}

// most comman used redis commands in nodejs with redis package and redis theory in the below comments only
// definations and examples only not code
// 1. SET command: The SET command is used to set a value for a specific key in Redis. It can also be used with the EX option to set an expiration time for the key.
// Example: SET mykey "Hello, Redis!" EX 60
// 2. GET command: The GET command is used to retrieve the value of a specific key from Redis.
// Example: GET mykey
// 3. DEL command: The DEL command is used to delete a specific key from Redis.
// Example: DEL mykey
// 4. EXPIRE command: The EXPIRE command is used to set an expiration time for a specific key in Redis.
// Example: EXPIRE mykey 60
// 5. KEYS command: The KEYS command is used to retrieve all keys that match a specific pattern from Redis.
// Example: KEYS my*
// 6. FLUSHALL command: The FLUSHALL command is used to delete all keys from Redis.
// Example: FLUSHALL

// full redis theory and definations applications usecases and commands with examples in nodejs using redis package is explained in the above code and comments only please refer to it for more details and examples.
