const CDP = require('chrome-remote-interface');
const config = require('../config/config.js');

function render(url) {

  CDP((client) => {
    // Extract used DevTools domains.
    const {
      Page,
      Runtime,
    } = client;

    // Enable events on domains we are interested in.
    Promise.all(
      [Page.enable()]
    ).then(() => {
      return Page.navigate({
        url: url,
      });
    });

    // Evaluate outerHTML after page has loaded.
    Page.loadEventFired(() => {
      setTimeout(() => {
        Runtime.evaluate({
          expression: 'document.documentElement.outerHTML',
        }).then((result) => {
          return result.result.value;
          client.close();
        });
      }, config.delay);
    });
  }).on('error', (err) => {
    console.error('[Reverse Cowproxy] : cannot connect to browser:', err);
  });
}

module.exports = { render };
