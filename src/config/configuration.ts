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
    app: {
      port: APP_PORT || 8888,
    },
    // 数据库
    database: {
      DB_TYPE: DB_TYPE || 'postgres',
      DB_HOST: DB_HOST || '127.0.0.1', // IP
      DB_PORT: DB_PORT || 5432, // 端口
      DB_USERNAME: DB_USERNAME || 'postgres', // 数据库
      DB_PASSWORD: DB_PASSWORD || '', // 密码
      DB_DATABASE: DB_DATABASE || 'test',
      DB_SYNC: DB_SYNC || false,
    },
    // redis
    redis: {
      REDIS_URL: REDIS_URL,
    },
    JWT_SECRET: JWT_SECRET,
  };
};
