import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { copyFile, opendir, mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const dirPath = join(__dirname, 'files/');
    try {
        const dir = await opendir(dirPath)
        mkdir(join(__dirname, 'files_copy/'))
            .then(async () => {
                for await (const dirent of dir) {
                    try {
                        await copyFile(join(dirPath, dirent.name), join(__dirname, `files_copy/${dirent.name}`));
                        console.log(`${dirent.name} was copied to files_copy`);
                    } catch (error) {
                        console.error(error);
                    }
                }
            })
            .catch(error => {
                if (error.code === 'EEXIST') {
                    console.error('FS operation failed');
                } else {
                    console.error(error);
                }
            });
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('FS operation failed');
        } else {
            console.error(error);
        }
    }
};

await copy();