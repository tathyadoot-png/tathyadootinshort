import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  tls: {}, // required for rediss://
});

redis.on("connect", () => {
  console.log("✅ Redis Connected (Cloud)");
});

redis.on("error", (err) => {
  console.error("❌ Redis Error:", err.message);
});

export default redis;
