import mongoose from "mongoose";
import { RedisDatabase } from "@/database/redis";

const exec = mongoose.Query.prototype.exec;

(mongoose.Query.prototype as any).cache = function (options: { key?: string } = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function (...args: any[]) {
  if (!this.useCache) {
    return exec.apply(this, args);
  }

  const client = RedisDatabase.getInstance().getClient();

  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name,
  });

  const cachedValue = await client.hGet(this.hashKey, key);

  if (cachedValue) {
    console.log("data from Redis");
    const doc = JSON.parse(cachedValue);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  console.log("data from MongoDB");
  const result = await exec.apply(this, args);

  await client.hSet(this.hashKey, key, JSON.stringify(result));
  await client.expire(this.hashKey, 60); // 5 min expiration

  return result;
};

export async function clearHash(hashKey: string) {
  const client = RedisDatabase.getInstance().getClient();
  await client.del(JSON.stringify(hashKey));
}