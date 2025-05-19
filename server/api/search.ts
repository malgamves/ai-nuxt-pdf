import { connectToDB } from '../../config/weaviate.js';

export default defineEventHandler(async (event) => {

  const query = getQuery(event)

    const searchTerm = query.searchTerm as string;
    const fileName = query.file as string
    const client = await connectToDB();

    const myCollection = client.collections.use("PDFLibrary")

    try {
        const response = await myCollection.generate.nearText(searchTerm,{
          groupedTask: `you are a chat assistant to talk with pdf that the user uploads.
          
          you must be friendly conversation and concise. only answer questions if asked.
          if you cannot possibly answer the question, kindly decline to answer.

          here is the users question:  ${searchTerm}`,
          groupedProperties: ["chunk"],
        }, {
            autoLimit: 2,
            includeVector: true,
            filters: myCollection.filter.byProperty("file_name").equal(fileName)
        })
        // console.log('response from ai', response)
        console.log('response from ai', response.objects)

        return { response: response }
        // console.log()
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
      
  
  })