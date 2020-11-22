const mongoose = require("mongoose");
const exec = mongoose.Query.prototype.exec;
//const client = require("redis").createClient();
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

const util = require("util");
client.hget = util.promisify(client.hget);

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) return exec.apply(this, arguments);

  console.log("SERVE IN CACHE =>", this.mongooseCollection.name, this.hashKey);
  const key = JSON.stringify(
    Object.assign({}, this.getFilter(), {
      collection: this.mongooseCollection.name,
    })
  );

  const cachedValue = await client.hget(this.hashKey, key);

  if (cachedValue) {
    const doc = JSON.parse(cachedValue);

    return Array.isArray(doc)
      ? doc.map((doc) => new this.model(doc))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);

  console.log("SERVE IN MONGO => ", this.mongooseCollection.name);

  client.hset(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, 60);

  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
