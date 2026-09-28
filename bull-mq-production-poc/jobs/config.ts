import "dotenv/config";

export const jobConfig = {
  timezone: process.env.TIME_ZONE ?? "UTC",
  redisUrl: process.env.REDIS_URL!,
};