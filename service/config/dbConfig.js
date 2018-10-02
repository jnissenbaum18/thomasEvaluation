var fs = require('fs');
var path = require("path");

function getConfig() {
    return new Promise(resolve => {
        fs.readFile(path.join(__basedir, '../../../tpcoro1-credentials.txt'), "utf8", (err, data) => {
            if (err) {
                switch (err.code) {
                    case "ENOENT":
                        throw new Error(`File not found outside root directory, expected tpcoro1-credentials.txt at ${path.join(__basedir, '../../../tpcoro1-credentials.txt')}`);
                    default:
                        throw err
                }
            }
            try {
                const configData = JSON.parse(data);
                console.log(`Credentials found: `, configData);
                resolve(configData); 
            } catch (e) {
                throw new Error("Invalid credentials file format, expected data to be a JSON object");
            }
        });
    })
};

module.exports = getConfig;