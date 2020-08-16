

const RedisOptions = {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_POORT || 6379,
    retryStrategy: times => {
      // reconnect after
      return Math.min(times * 50, 2000);
    }
};

export default RedisOptions;