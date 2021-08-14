require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DEV_DB_HOST,
      port: process.env.DEV_DB_PORT,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
      database: process.env.DEV_DB,
      charset: "utf8",
    },
    // debug: true,
    pool: {
      min: 1,
      max: 20,
    },
    migrations: {
      directory: __dirname + "/app/migrations",
    },
    seeds: {
      directory: __dirname + "/app/seeds",
    },
  },
};
// export const production = {
//   client: 'pg',
//   connection: {
//     host: process.env.PROD_DB_HOST,
//     port: process.env.PROD_DB_PORT,
//     user: process.env.PROD_DB_USER,
//     password: process.env.PROD_DB_PASSWORD,
//     database: process.env.PROD_DB,
//     charset: 'utf8'
//   },
//   pool: {
//     min: 1,
//     max: 20,
//   },
//   migrations: {
//     directory: __dirname + '/app/migrations'
//   }
// }
