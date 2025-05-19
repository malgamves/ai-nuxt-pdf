import { connectToDB } from '../../config/weaviate.js';

export default defineEventHandler(async (event) => {

  const query = getQuery(event)

    const client = await connectToDB();

    try {
      const myCollection = client.collections.use("PDFLibrary")
    
      const response = await myCollection.aggregate.overAll({
          returnMetrics: myCollection.metrics.aggregate('file_name').text(['count', 'topOccurrencesValue'])
      });
        

        return { response: response.properties.file_name.topOccurrences }
        // console.log()
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
      
  
  })