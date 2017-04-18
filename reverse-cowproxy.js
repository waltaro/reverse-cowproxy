// Libraries
const express = require('express');
const parser = require('body-parser');
const CDP = require('chrome-remote-interface');
const config = require('./config/config.js');
const renderer = require('./renderer/renderer.js');

const cowproxy = express();

cowproxy.use(parser.urlencoded({
  extended: true,
}));

cowproxy.get(config.endpoint, (req, res) => {
  res.send('Nothing to see here folks.');
});

cowproxy.post(config.endpoint, (req, res) => {
  // need to add error checking for url
  let url = req.body.url;
  let body = renderer.render(url);
  res.send(body);
});

cowproxy.listen(config.port, config.hostname, () => {
  console.log(`[Reverse Cowproxy] : listening on ${config.hostname}:${config.port}`);
});
