module.exports = {
  development: {
    username: process.env.PGUSER || 'postgres',
    password: '123456',
    database: 'estimation',
    host: 'localhost',
    dialect: 'postgres',
    port: '5432'
  },
  test: {
    username: process.env.PGUSER || 'postgres',
    password: '123456',
    database: 'estimation',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'POSTGRES_DB_URL',
    username: process.env.PGUSER || 'postgres',
    password: '123456',
    database: 'estimation',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
}
