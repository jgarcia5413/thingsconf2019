// collector.js
// connects to personal TTN feed using Node.js SDK
// stores data in mongodb database
// Author - Nic Burkinshaw nic@thinnovation.co.uk

const ttn = require('ttn');
const config = require('./config');

const { insertDocument } = require('./mongo.js');

ttn.data(config.ttn.user, config.ttn.password)
    .then(function (client) {
        client.on("uplink", function (devID, payload) {
            var messageObject = {
                device: payload['dev_id'],
                counter: payload['counter'],
                tod: (new Date()).toJSON().slice(0, 19).replace(/T/g, ' '),
                payload: payload['payload_raw'],
                metadata: payload['metadata']
            };
            insertDocument(messageObject)
        })
    })
    .catch(function (error) {
        console.error("Error", error)
        process.exit(1)
    })

function exitHandler(options, err) {
    if (err) {
        console.error('Application exiting...', err);
    }
    process.exit();
}

process.on('exit', exitHandler.bind(null, { cleanup: true }));
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
