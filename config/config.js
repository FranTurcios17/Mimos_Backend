require('dotenv').config();

const commonConfig = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'railway',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  dialect: process.env.DB_DIALECT || 'mysql',
  useDecimals: true,
  logging: false,
};

module.exports = {
  development: { ...commonConfig },
  test: { ...commonConfig },
  production: { ...commonConfig },
};
