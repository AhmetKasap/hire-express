

const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');
const path = require('path');

const createClient = () => {
  const caCertPath = path.resolve(__dirname, 'elastic-stack-ca.p12');
  const caCert = fs.readFileSync(caCertPath);

  return new Client({
    node: `https://${process.env.ELASTIC_HOST}/9200`,
    auth: {
      username: process.env.ELASTIC_USERNAME,
      password: process.env.ELASTIC_PASSWORD
    },
    tls: {
      ca: caCert,
      rejectUnauthorized: false
    }
  })
}

module.exports = { createClient }
























