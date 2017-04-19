const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ 
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Nothing to see here folks.');
});

app.post('/', (req, res) => {
  var url = req.body.url;

  res.send('Requested URL: ' + url);
});

app.listen(port, () => {
  console.log(`listening on port ${ port }`);
});