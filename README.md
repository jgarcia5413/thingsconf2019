# Workshop at The Things Conference 2019 - how to collect your IoT data via MQTT, store in a NoSQL database, then display data as a graph
# This assumes you already have a LoRaWAN device and a registered account on thethingsnetwork.org
# Also required is an internet connection and nodejs LTS (I tested this with v11.6.0) installed
# You should be familiar with nodeJS to follow these instructions!

Just a hint - basic items are named differently in SQL and NoSQL databases
  database in both is the same, tables in SQL are collections in NoSQL, records in SQL are documents in NoSQL

1. Create your own MongoDB Atlas database instance in the cloud: - https://www.mongodb.com/cloud/atlas - accept the defaults
2. Take a note of your username, password, and server connection (similar to: ncbttn-f3ftfg.mongodb.net)
3. Decide on names for your database (I chose thinnovation) and collection (I chose ttndata)
4. Open up your TTN console to the applications page, choose your application - https://console.thethingsnetwork.org/applications and make a note of your APPLICATION name and ACCESS KEY
5. Copy config.template to config.js and replace the parameters in <> with the values obtained above.
6. Copy your config.js into both collector and viewer folders
7. Change to the collector folder and run npm install to install the required nodejs libraries - run npm start
8. You will see a message 'db connected' each time a LoRaWAN device reports into TTN - a new document is inserted into your collection.
9. Change to the viewer folder and run npm install to install the required nodejs libraries - run npm start
10. You will see a message 'my app listening on PORT 3000'
11. Open up a browser and display the Web Developer Tools Console
11. Enter a URI similar to localhost:3000/?device=<VALIDDEVICENAME>&count=50 - replace <VALIDDEVICENAME> with that of your LoRAWAN device.
12. You should see a chart grid with valid data, red for rssi and green for snr values
