const express = require('express');

let cowproxy = express();

cowproxy.get('/', (req, res) => {
  res.send('Yee haw!');
});

cowproxy.listen(8080, () => {
  console.log('Listening on port: 8080');
});
