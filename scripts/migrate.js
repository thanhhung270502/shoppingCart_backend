const pool = require('../src/config/db');

(async () => {
    try {
        console.log('Waiting...');
        console.log('If program does not show anything, program run sucessfully');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
