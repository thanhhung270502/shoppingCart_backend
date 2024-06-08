const encode = (str) => {
    const json = JSON.stringify(str);
    return Buffer.from(json).toString('base64');
};

module.exports = {
    encode,
};
