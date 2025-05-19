import { connectToDB } from '../../config/weaviate.js';
import pdf from 'pdf-parse/lib/pdf-parse.js'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = await connectToDB();

    try {
        // Check if request body contains PDF buffer
        if (!body.pdfBuffer) {
            throw createError({
                statusCode: 400,
                statusMessage: 'No PDF buffer provided in request body',
            })
        }

        const pdfBuffer = Buffer.from(body.pdfBuffer);
        const pdfArray = new Uint8Array(body.pdfBuffer)

        // Validate that the input is actually a Buffer
        if (!Buffer.isBuffer(pdfBuffer)) {

            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid input: pdfBuffer must be a Buffer',
            })
        }

        let myCollection = client.collections.use('PDFLibrary');

        // handle text
        const loadingTask = await pdf(pdfArray);

        const pdfDocument = await loadingTask.text;

        const chunkSize = 100
        const overlapSize = 5

        const textWords = pdfDocument.replace(/\s+/g, ' ').split(' ');

        let chunks = [];
        
        // Chunking
        for (let i = 0; i < textWords.length; i += chunkSize) {
            let chunk = textWords.slice(Math.max(i - overlapSize, 0), i + chunkSize).join(' ');
            chunks.push(chunk);
        }

        const list = [];

        for (const [index, chunk] of chunks.entries()) {
            const obj = {
                properties: {
                    chunk: chunk,
                    chunk_index: index,
                    file_name: body.fileName,
                },
            };

            list.push(obj);
        }

        const importResult = await myCollection.data.insertMany(list)
        console.info("Imported!", importResult.uuids)

        // Return success response with UUIDs
        return {
            success: true,
            message: 'PDF successfully Imported!',
            data: importResult.uuids
        };

    } catch (error) {
        // Log error for debugging (you might want to use a proper logger in production)
        console.error('Error converting PDF to base64:', error);

        // Return error response
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error while converting PDF',
        })
    }
})

