import { connectToDB } from './weaviate.js';
import weaviate, { configure, generativeParameters } from 'weaviate-client'


async function main() {

    const client = await connectToDB();

    try {

        const myCollection = client.collections.use("PDFLibrary")
    
        const response = await myCollection.aggregate.overAll({
            returnMetrics: myCollection.metrics.aggregate('file_name').text(['count', 'topOccurrencesValue'])
        });

        let genResponse = await myCollection.generate.nearText("Cute animals", {
            groupedTask: "Translate to french please!",
            config: generativeParameters.openAI()
          }, {
            limit: 3,
        })

    
    } catch (error) {
        // Log error for debugging (you might want to use a proper logger in production)
        console.error('query error', error);  
    }  
}

void main();