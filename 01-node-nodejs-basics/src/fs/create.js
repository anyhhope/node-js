import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { writeFile } from 'fs/promises';
import { join } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const filepath = join(__dirname, 'files/fresh.txt');
    writeFile(filepath, 'I am fresh and young', { encoding: 'utf8', flag: 'wx' })
        .catch(error => {
            if (error.code === 'EEXIST') {
                console.error('FS operation failed');
            } else {
                console.error(error);
            }
        });
};

await create();