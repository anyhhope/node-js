const parseEnv = () => {
    Object.keys(process.env)
        .filter(key => key.startsWith('RSS_'))
        .map(el => console.log(`${el}=${process.env[el]}`));
};

parseEnv();