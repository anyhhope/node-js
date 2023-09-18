#!/usr/bin/env node
import os from 'os';
import { readdir, open, writeFile, rm, rename, copyFile } from 'fs/promises';
import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip, createGunzip } from 'zlib';


const username = process.argv.filter(el => el.startsWith('--username=')).map(el => el.slice(11))[0];
if (username) {
    process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
    process.chdir(os.homedir());
    process.stdout.write(`You're in ${process.cwd()}\n\n`);
}
else {
    process.stdout.write('To start application enter: filemanager-nodejs --username=your_username\n');
    process.exit();
}

async function handleCommands(command) {
    switch (command.split(' ')[0]) {
        case 'exit':
            process.stdout.write(`\nThank you for using File Manager, ${username}, goodbye!\n`);
            process.exit(0);
        case 'cd':
            try {
                process.chdir(command.slice(3));
                process.stdout.write(`You're in ${process.cwd()}\n\n`);
            }
            catch (error) {
                process.stdout.write('Path not found\n');
                process.stdout.write(`You're in ${process.cwd()}\n\n`);
            }
            break;
        case 'up':
            try {
                process.chdir('..');
                process.stdout.write(`You're in ${process.cwd()}\n\n`);
            }
            catch (error) {
                process.stdout.write('Path not found\n');;
                process.stdout.write(`You're in ${process.cwd()}\n\n`);
            }
            break;
        case 'ls':
            try {
                const files = await readdir(process.cwd(), { withFileTypes: true });
                let data = [];
                for (const file of files) {
                    data.push({ 'Name': file.name, 'Type': file.isDirectory() ? 'directory' : file.isFile() ? 'file' : file.isSymbolicLink ? 'link' : file.isSocket ? 'socket' : 'other' });
                }
                data.sort((x, y) => x['Type'].localeCompare(y['Type']));
                console.table(data);
                process.stdout.write(`You're in ${process.cwd()}\n\n`);
            } catch (err) {
                console.error(err);
            }
            break;
        case 'cat':
            try {
                const file = await open(join(process.cwd(), command.slice(4)));
                file.createReadStream().pipe(process.stdout)
                process.stdout.write('\n');
            } catch (err) {
                process.stdout.write('Path not found\n');
                process.stdout.write(`You're in ${process.cwd()}\n\n`)
            }
            break;
        case 'add':
            try {
                let message = '';
                let fileName = command.slice(4);
                if (command.indexOf(' ', command.indexOf('.') + 1) + 1 > 0) {
                    message = command.slice(command.indexOf(' ', command.indexOf('.') + 1) + 1);
                    fileName = command.slice(4, command.indexOf(' ', command.indexOf('.') + 1));
                }
                writeFile(join(process.cwd(), fileName), message, { encoding: 'utf8', flag: 'wx' })
                    .catch((err) => console.log(err));
                process.stdout.write(`You're in ${process.cwd()}\n`)
            } catch (err) {
                process.stdout.write('Path not valid\n');
                process.stdout.write(`You're in ${process.cwd()}\n\n`)
            }
            break;
        case 'rm':
            rm(join(process.cwd(), command.slice(3)))
                .catch((error) => {
                    if (error.code == 'ENOENT') console.error('FS operation failed');
                    else console.error(error);
                });
            break;
        case 'rn':
            const filePath = command.split(' ')[1];
            const newFileName = command.slice(command.indexOf(' ', command.indexOf(' ') + 1) + 1);
            rename(filePath, join(process.cwd(), newFileName))
                .catch((error) => {
                    if (error.code == 'ENOENT') console.error('FS operation failed');
                    else console.error(error);
                });
            break;
        case 'cp':
            try {
                const filePathFrom = command.splite(' ')[1];
                const filePathTo = command.splite(' ')[2];
                await copyFile(filePathFrom, filePathTo);
                process.stdout.write(`You're in ${process.cwd()}\n`)
            } catch (error) {
                console.error(error);
                process.stdout.write(`You're in ${process.cwd()}\n`)
            }
            break;
        case 'os':
            try {
                command = command.split(' ')[1];
                switch (command) {
                    case '--EOL':
                        console.log(JSON.stringify(os.EOL))
                        process.stdout.write(`You're in ${process.cwd()}\n`)
                        break;
                    case '--cpus':
                        console.log(os.cpus())
                        process.stdout.write(`You're in ${process.cwd()}\n`)
                        break;
                    case '--homedir':
                        console.log(os.homedir())
                        process.stdout.write(`You're in ${process.cwd()}\n`)
                        break;
                    case '--username':
                        console.log(process.env.USERNAME)
                        process.stdout.write(`You're in ${process.cwd()}\n`)
                        break;
                    case '--architecture':
                        console.log(process.arch)
                        process.stdout.write(`You're in ${process.cwd()}\n`)
                        break;
                    default:
                        process.stdout.write('Invalid command\n');
                        process.stdout.write(`You're in ${process.cwd()}\n`)
                }
            } catch (err) {
                console.log(err);
            }
            break;
        case 'compress':
            try{
                const filePathFrom = command.split(' ')[1];
                createReadStream(filePathFrom)
                    .pipe(createGzip())
                    .pipe(createWriteStream(filePathFrom.replace(".txt", ".gz")))
                    .on('finish', () => {
                        console.log('Compression process done')
                        process.stdout.write(`You're in ${process.cwd()}\n`)
                    })
            } catch (err) {console.log(err)}
            break;
        case 'decompress':
            try{
                const filePathFrom = command.split(' ')[1];
                createReadStream(filePathFrom)
                    .pipe(createGunzip())
                    .pipe(createWriteStream(filePathFrom.replace(".gz", ".txt")))
                    .on('finish', () => {
                        console.log('Decompression process done')
                        process.stdout.write(`You're in ${process.cwd()}\n`)
                    })
            } catch (err) {console.log(err)}
            break;
        default:
            process.stdout.write('Invalid command\n');
            process.stdout.write(`You're in ${process.cwd()}\n\n`);
    }
}

process.stdin.on('data', (data) => handleCommands(data.toString().trim()));

process.on('SIGINT', () => {
    process.stdout.write(`\nThank you for using File Manager, ${username}, goodbye!\n`);
    process.exit(0);
});