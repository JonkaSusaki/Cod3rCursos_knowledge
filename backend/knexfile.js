// Update with your config settings.

module.exports = {


    client: 'postgresql',
    connection: {
      database: 'projeto1_vuejs',
      user:     'postgres',
      password: '326598'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }


};
