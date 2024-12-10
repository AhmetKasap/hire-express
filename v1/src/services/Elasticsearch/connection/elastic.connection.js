const { Client } = require('@elastic/elasticsearch');


const createClient = () => {
  return new Client({
    node: `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
    auth: {
      username: process.env.ELASTIC_USERNAME,
      password: process.env.ELASTIC_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

module.exports = { createClient }
























