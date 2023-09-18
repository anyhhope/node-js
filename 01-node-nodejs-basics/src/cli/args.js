const parseArgs = () => {
    process.argv.forEach((el, index) => {
        if (el.startsWith('--')) {
            console.log(`${el} is ${process.argv[index + 1]}`);
        }
    });

};

parseArgs();