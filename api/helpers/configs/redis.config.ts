import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";

import logger from "@/utils/logger";

dotenv.config();

let redisClient: RedisClientType;

async function initRedisClient() {
  redisClient = createClient({ url: process.env.REDIS_URL!});

  redisClient.on("error", (err: any) =>
    console.error("Redis Client Error", err.message)
  );

  await redisClient.connect();
  logger.info("Connected to Redis");
}

initRedisClient().catch(logger.error);

export { redisClient };
