import * as Joi from 'joi';

export function handleEnvFilePath() {
  const isDev = process.env.NEST_ENVIRONMENT === 'dev';
  const envFilePath = ['.env'];
  isDev ? envFilePath.unshift('.env.development') : envFilePath.unshift('.env.production');
  return envFilePath;
}

export function handleValidationSchema() {
  return Joi.object({
    DB_TYPE: Joi.string().valid('postgres'),
    DB_HOST: Joi.string().default('192.168.1.2'),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string().default('postgres'),
    DB_PASSWORD: Joi.string().default('root'),
    DB_DATABASE: Joi.string().default('vis'),
    DB_SYNC: Joi.boolean().default(false),
    REDIS_URL: Joi.string().default('redis://default:123456@192.168.1.2:6379'),
    REDIS_HOST: Joi.string().default('192.168.1.2'),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_PASSWORD: Joi.string().default('123456'),
    JWT_SECRET: Joi.string().default('d0!doc15415B0*4G0`'),
    NEST_ENVIRONMENT: Joi.valid('prod', 'dev', 'local').default('local'),
  });
}
