# workshop at The Things Conference 2019 - how to collect your IoT data via MQTT, store in a NoSQL database, then display data as a graph
1. Create your own MongoDB Atlas database instance in the cloud: - https://www.mongodb.com/cloud/atlas
2. Take a note of your username, password, and server connection (similar to: ncbttn-f3ftfg.mongodb.net)
3. Decide on names for your database (I chose thinnovation) and collection (I chose ttndata)
4. Open up your TTN console - applications and make a note of your APPLICATION name and ACCESS KEY
5. Copy config.template to config.js and replace the parameters in <> with the values obtained above.
6. Copy your config.js into both collector and viewer folders
7. Change to the collector folder and run npm install to install the required nodejs libraries - run npm start
8. Change to the viewer folder and run npm install to install the required nodejs libraries - run npm start
