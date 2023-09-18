import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { rm } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
    rm(join(__dirname, 'files/fileToRemove.txt'))
        .catch((error) => {
            if(error.code == 'ENOENT') console.error('FS operation failed');
            else console.error(error);
        });
};

await remove();