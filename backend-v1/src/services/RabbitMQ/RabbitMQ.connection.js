const amqp = require('amqplib')
const APIError = require('../../utils/Error')
require('dotenv').config()

const rabbitmqConnection = async () => {
    try {
        const connectionString = process.env.RABBITMQ_CONNECTION_STRING
        const connection = await amqp.connect(connectionString)  //* amqp connection
        return connection
        
    } catch (error) {
        throw new APIError('rabbitmq connection error', 500)
    }

}

module.exports = rabbitmqConnection