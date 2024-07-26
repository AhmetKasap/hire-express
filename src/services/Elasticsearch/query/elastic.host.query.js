const { v4: uuidv4 } = require('uuid')
const {createClient} = require('../connection/elastic.connection')
const APIError = require('../../../utils/Error')

const client = createClient()


const addHost = async (hostData) => {
    const id = uuidv4()
    try {
      const result = await client.index({
        index: 'hosts',
        id: id,
        document: {
          location: hostData.location,
          hostType: hostData.hostType,
          numberOfGuests: hostData.numberOfGuests,
          price: hostData.price,
          explanation: hostData.explanation,
          images: hostData.images,
          status: hostData.status,
          userRef: hostData.userRef.toString()
        }
      })
      return result
      
    } catch (error) {
      throw new APIError('an error occurred while adding data to elasticsearch',500)
      
    }
    
}

const getAllHost = async() => {
  try {
    const response = await client.search({
      index: "hosts", 
      body: {
        query: {
          match_all: {} 
        }
      }
    })
    return response.hits.hits
    
  } catch (error) {
    return error
  }
  
}




module.exports = {
  addHost,
  getAllHost
}
