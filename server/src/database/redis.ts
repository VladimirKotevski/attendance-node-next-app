import { createClient } from "redis";
import { logger } from "../utils/logger";

export class RedisDatabase {
  private static instance: RedisDatabase;
  private client;

  private constructor() {
    this.client = createClient({
      url: "redis://:secret@redis:6379",
    });

    this.client.on("error", (err) => logger.error("❌ Redis Client Error:", err));
  }

  public static getInstance(): RedisDatabase {
    if (!RedisDatabase.instance) {
      RedisDatabase.instance = new RedisDatabase();
    }
    return RedisDatabase.instance;
  }

  public async connect(): Promise<void> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      logger.info("✅ Connected to Redis.");
    } catch (error) {
      logger.error("❌ Redis connection error:", error);
      process.exit(1);
    }
  }

  public getClient() {
    return this.client;
  }
}