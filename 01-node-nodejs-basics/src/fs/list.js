import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { opendir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
    const dirPath = join(__dirname, 'files/');
    try {
        const dir = await opendir(dirPath)
        for await (const dirent of dir) {
            console.log(dirent.name);
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('FS operation failed');
        } else {
            console.error(error);
        }
    }
};

await list();