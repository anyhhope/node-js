import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { createGzip } from 'zlib'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compress = async () => {
    createReadStream(join(__dirname, 'files/fileToCompress.txt'))
        .pipe(createGzip())
        .pipe(createWriteStream('files/fileToCompress.gz'))
        .on('finish', () => {
            console.log('Compression process done')
        })
};

await compress();