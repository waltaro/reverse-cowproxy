# Reverse Cowproxy
Reverse Cowproxy is a Node.js application that renders pages server side and serves it back to the user via a response.
## Dependencies
* [Chrome Canery](https://www.google.com.au/chrome/browser/canary.html)
* [express](https://github.com/expressjs/express)
* [body-parser](https://github.com/expressjs/body-parser)
* [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)
## Usage
### Setup
Run Chrome Canery in headless mode
``/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --headless --remote-debugging-port=9222``
### Running
To start the server
``node reverse-cowproxy.js``
### Render Page
To render a page, post..
