import weaviate from 'weaviate-client'
import 'dotenv/config'

const weaviateURL = process.env.WEAVIATE_URL as string
const weaviateKey = process.env.WEAVIATE_ADMIN_KEY as string
const openaiKey = process.env.OPENAI_API_KEY as string

export const connectToDB = async () => {
  try {
    const client = await weaviate.connectToWeaviateCloud(weaviateURL,{
          authCredentials: new weaviate.ApiKey(weaviateKey),
          headers: {
           'X-OpenAI-Api-Key':  openaiKey,
         }
        }
      )
      console.log(`We are connected! ${await client.isReady()}`);
      return client
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
