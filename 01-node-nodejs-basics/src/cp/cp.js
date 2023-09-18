import { spawn }  from 'child_process'

function spawnChildProcess(args) {
    const child = spawn('node', ['./files/script.js', ...args], { stdio: [process.stdin, process.stdout, 'pipe', 'ipc'] });

    child.on('error', (error) => {
        console.error(`Ошибка: ${error.message}`);
    });

    child.on('exit', (code, signal) => {
        if (code) console.log(`Процесс завершился с кодом ${code}`);
        if (signal) console.log(`Процесс был убит сигналом ${signal}`);
    });
}

spawnChildProcess(['arg1', 'arg2']);

