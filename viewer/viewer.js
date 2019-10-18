const express = require('express')
const app = express()
const port = 3000

const {getArray} = require('./mongo');

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  getArray(req.query.device, req.query.count)
    .then((arrayData) => {
      res.render('index', {
        data: pushData(arrayData)
      })
    });
})

app.listen(port, () => console.log(`my app listening on PORT ${port}`))

var pushData = (arrayData) => {
  var myData = {};
  myData.rssi = [];
  myData.snr = [];
  myData.time = [];
  
  for (const element of arrayData) {
    myData.rssi.push(element.metadata.gateways[0].rssi);
    myData.snr.push(element.metadata.gateways[0].snr);
    myData.time.push(element.metadata.time.substring(5, 16).replace(/T/i, ' '));
  }

  return JSON.stringify(myData);
}

// ends
