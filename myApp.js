const express = require('express');
const app = express();
const helmet = require('helmet');

// Configure helmet middleware for HSTS with HTTPS for the next 90 days
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;


// Configure helmet middleware with a configuration object
app.use(
  helmet({
    hidePoweredBy: {}, // Remove X-Powered-By header
    frameguard: {
      action: 'DENY',
    },
    xssFilter: {}, // Sanitize input to your server
    noSniff: {}, // Set X-Content-Type-Options header to nosniff
    ieNoOpen: {}, // Set X-Download-Options header to noopen
    hsts: {
      maxAge: ninetyDaysInSeconds,
      force: true,
    }, // Configure HSTS with HTTPS for the next 90 days
    dnsPrefetchControl: {}, // Enable DNS prefetch control
    noCache: {}, // Enable noCache
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'trusted-cdn.com'],
      },
    }, // Configure Content Security Policy (CSP)
  })
);




module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
