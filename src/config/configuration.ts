export default () => {
  const {
    REDIS_URL,
    APP_PORT,
    DB_TYPE,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_SYNC,
    JWT_SECRET,
  } = process.env;
  return {
    // 基础相关
    app: {
      port: APP_PORT || 8765,
    },
    // 数据库
    database: {
      DB_TYPE: DB_TYPE,
      DB_HOST: DB_HOST, // IP
      DB_PORT: DB_PORT, // 端口
      DB_USERNAME: DB_USERNAME, // 数据库
      DB_PASSWORD: DB_PASSWORD, // 密码
      DB_DATABASE: DB_DATABASE,
      DB_SYNC: DB_SYNC,
    },
    // redis
    redis: {
      REDIS_URL: REDIS_URL,
    },
    JWT_SECRET: JWT_SECRET,
  };
};
