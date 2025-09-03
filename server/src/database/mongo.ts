import mongoose from "mongoose";
import { logger } from "../utils/logger";

export class Database {
  private static instance: Database;
  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      const mongoUri = "mongodb://root:secret@mongo:27017/database?authSource=admin";

      await mongoose.connect(mongoUri, {
        // options (optional)
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });

      logger.info("✅ Connected to MongoDB.");
    } catch (error) {
      logger.error("❌ MongoDB connection error:", error);
      process.exit(1);
    }
  }
}