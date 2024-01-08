const path = require("path");

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', "database", "moviesDatabase.db")
    },
    pool: {
      afterCreate: (connection, callBack) => connection.run("PRAGMA foreign_keys = ON", callBack)
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', "database", "knex", "migrations")
    },
    useNullAsdefault: true
  },
};
