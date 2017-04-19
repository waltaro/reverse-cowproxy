var config = {};

config.hostname = 'localhost';
config.port = process.env.WEB_PORT || 8080;
config.endpoint = '/';
config.delay = 500;

module.exports = config;
