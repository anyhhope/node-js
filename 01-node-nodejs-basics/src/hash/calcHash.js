import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createHash } from 'crypto'
import { open } from 'fs/promises'
import { stdout } from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const calculateHash = async () => {
    const hash = createHash('sha256');
    const file = await open(join(__dirname, 'files/fileToCalculateHashFor.txt'))
        .catch((error) => {
            if(error.code == 'ENOENT') console.error('FS stream operation failed');
            else console.error(error);
        })
    file.createReadStream().pipe(hash).setEncoding('hex').pipe(stdout);
};

await calculateHash();