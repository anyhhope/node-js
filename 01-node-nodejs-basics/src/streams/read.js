import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { open } from 'fs/promises';
import { stdout } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const file = await open(join(__dirname, 'files/fileToRead.txt'))
        .catch((error) => {
            if(error.code == 'ENOENT') console.error('FS stream operation failed');
            else console.error(error);
        })
    file.createReadStream().pipe(stdout);
};

await read();