const {createClient} = require('./elastic.connection')
const elasticClient = createClient()


(async () => {
    try {
      const indexName = 'my-new-index'; // Veriyi ekleyeceğiniz index adı
      const document = {
        title: 'Sample Document',
        date: new Date(),
        content: 'This is a sample content.'
      };
  
      const response = await elasticClient.index({
        index: indexName,
        document: document
      });
  
      console.log('Veri eklendi:', response);
    } catch (error) {
      console.error('Veri ekleme hatası:', error);
    }
  })();





/*
const {createClient} = require('../services/Elasticsearch/elastic.connection')
const elasticClient = createClient()
const test = async(req,res) => {
    try {
        const indexName = 'my-new-index'; // Veriyi ekleyeceğiniz index adı
        const document = {
          title: 'Sample Document',
          date: new Date(),
          content: 'This is a sample content.'
        };
    
        const response = await elasticClient.index({
          index: indexName,
          document: document
        });
    
        console.log('Veri eklendi:', response);
      } catch (error) {
        console.error('Veri ekleme hatası:', error);
      }
}


*/
