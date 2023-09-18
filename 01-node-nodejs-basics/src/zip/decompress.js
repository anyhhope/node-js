import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { createGunzip } from 'zlib'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const decompress = async () => {
    createReadStream(join(__dirname, 'files/fileToCompress.gz'))
        .pipe(createGunzip())
        .pipe(createWriteStream('files/filedecompress.txt'))
        .on('finish', () => {
            console.log('decompression process done')
        })
};

await decompress();