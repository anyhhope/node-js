import { Worker } from 'worker_threads'
import os from 'os';

function runWorker(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        })
    })
}

const performCalculations = async () => {
    const cpuCores = os.cpus();
    const numberOfCPUCores = cpuCores.length;
    let promises = []
    for(let i = 10; i < (numberOfCPUCores + 10); i++){
        promises.push(runWorker(i));
    }
    let results = await Promise.all(promises.map(p => p.catch(e => e)));
    let resultsInfo =  results.map(result => result instanceof Error ? {'status' : 'error', 'data': null} : 
        {'status' : 'resolved', 'data': result['nthFibonacci']});
    console.log(resultsInfo)
};

await performCalculations();