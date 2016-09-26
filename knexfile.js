// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/capstone-psl'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
