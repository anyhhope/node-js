import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { open } from 'fs/promises';
import { stdin } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const fileHandle = await open(join(__dirname, 'files/fileToWrite.txt'), 'w')
        .catch((error) => {
            if(error.code == 'ENOENT') console.error('FS stream operation failed');
            else console.error(error);
        })
    const writeStream = fileHandle.createWriteStream();
    stdin.pipe(writeStream);

    process.on('SIGINT', () => {
        console.log('Stopped reading on Ctrl+C.');
        writeStream.end();
        fileHandle.close().then(() => {
            process.exit(0);
        });
    });
};

await read();
