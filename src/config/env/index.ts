import * as Joi from 'joi';

export default Joi.object({
  APP_NAME: Joi.string().required(),
  APP_PORT: Joi.number().default(5000),
  APP_HOST: Joi.string().default('localhost'),
  APP_SALT: Joi.number().default(8),
  // Datase
  DB_HOST: Joi.string().default('localhost'),
  DB_DATABASE: Joi.string().default('postgres'),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('postgres'),
  DB_PORT: Joi.number().default(5432),
  // Redis
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
});
