const {createClient} = require('../connection/elastic.connection')
const APIError = require('../../../utils/Error')

const client = createClient()


const addHost = async (hostData) => {
    try {
      const result = await client.index({
        index: 'hosts',
        id: hostData._id,
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

const deleteHost = async (id) => {
  const response = await client.delete({
    index :"hosts",
    id : id
  })
  return response
}


const updateHost = async (hostData) => {
  return await client.update({
    index : "hosts",
    id : hostData._id,
    doc : hostData
  })

}

const getHostById = async(id) => {
  return await client.get({
    index : "hosts",
    id : id
  })

}

const getAllHostByUserId = async(userId) => {
  try {
    const response = await client.search({
      index: 'hosts',
      body: {
        query: {
          match: {
            userId: userId
          }
        }
      }
    });

    return response.body.hits.hits; // İlgili hostları döndürür
  } catch (error) {
    console.error('Error getting hosts by userId:', error);
    throw error;
  }
}



const getAllHost = async() => {
  try {
    const response = await client.search({
      index: "hosts", 
      query : {
        match_all : {}
      }
      
    })
    return response.hits.hits
    
  } catch (error) {
    return error
  }
  
}






module.exports = {
  addHost,
  deleteHost,
  updateHost,
  getAllHost,
  getHostById,
  getAllHostByUserId
}
