import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    try {
        const contents = await readFile(join(__dirname, 'files/fileToRead.txt'), { encoding: 'utf8' });
        console.log(contents);
    } catch (error) {
        if(error.code == 'ENOENT') console.log('FS operation failed');
        else console.error(error);;
    }
};

await read();