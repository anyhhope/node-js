import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { rename as renameFunc } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    renameFunc(join(__dirname, 'files/wrongFilename.txt'), join(__dirname, 'files/properFilename.md'))
        .catch((error) => {
            if(error.code == 'ENOENT') console.error('FS operation failed');
            else console.error(error);
        });
};

await rename();