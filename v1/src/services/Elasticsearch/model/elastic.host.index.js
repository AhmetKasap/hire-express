const {createClient} = require('../connection/elastic.connection')
const APIError =require('../../../utils/Error')

const client = createClient()
const createHostIndex = async () => {
    try {
        const indexExists = await client.indices.exists({ index: 'hosts' })
        if(!indexExists) {
            const response = await client.indices.create({
                index: 'hosts',
    
                mappings: {
                    properties: {
                        location: { type: 'text' },
                        hostType: { type: 'text' },
                        numberOfGuests: { type: 'integer' },
                        price: { type: 'float' },
                        explanation: { type: 'text' },
                        images: { type: 'keyword' },
                        status: { type: 'keyword' },
                        userRef: { type: 'keyword' }
                    }
                }
            })
        }
  
    } catch (error) {
        throw new APIError('elasticsearch index error', 500)
    }
}

module.exports = createHostIndex