import { connectToDB } from './weaviate.js';
import weaviate from 'weaviate-client'

async function main() {

    const client = await connectToDB();

    try {

        await client.collections.delete('PDFLibrary');
    
        const response = await client.collections.create({
            name: 'PDFLibrary',
            // Define your vectorizer 
            vectorizers:
                weaviate.configure.vectorizer.text2VecOpenAI(),
                generative: weaviate.configure.generative.openAI()
        });

        console.log("Collection created!")
    
    } catch (error) {
        // Log error for debugging (you might want to use a proper logger in production)
        console.error('Unable to create collection:', error);  
    }  
}

void main();