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
  let url = req.body.url;;

  CDP((client) => {
    // Extract used DevTools domains.
    const {
      Page,
      Runtime,
    } = client;

    // Evaluate outerHTML after page has loaded.
    Page.loadEventFired(() => {
      setTimeout(() => {
        Runtime.evaluate({
          expression: 'document.documentElement.outerHTML',
        }).then((result) => {
          res.send(result.result.value);
          client.close();
        });
      }, config.delay);
    });

    // Enable events on domains we are interested in.
    Promise.all(
      [Page.enable()]
    ).then(() => {
      return Page.navigate({
        url: url,
      });
    });

  }).on('error', (err) => {
    console.error('[Reverse Cowproxy] : cannot connect to browser:', err);
  });
});

cowproxy.listen(config.port, config.hostname, () => {
  console.log(`[Reverse Cowproxy] : listening on ${config.hostname}:${config.port}`);
});
