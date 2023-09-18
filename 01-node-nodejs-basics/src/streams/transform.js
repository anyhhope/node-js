import { stdin, stdout } from 'process';
import { Transform } from 'stream';

const reverseTransform = new Transform({
    transform(chunk, _, callback) {
        this.push(chunk.toString().split('').reverse().join(''));
        callback();
    }
});

const transform = async () => {
    stdin.pipe(reverseTransform).pipe(stdout);
};

await transform();