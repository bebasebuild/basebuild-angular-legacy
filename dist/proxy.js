 /*jshint unused:false */

var proxy = null;
var httpProxy = require('http-proxy');
var chalk = require('chalk');


// module.exports = [proxyMiddleware];
module.exports = function(options) {

  'use strict';
  var moduleOptions = options.modulesData['proxy'];

  /*
   * Location of your backend server
   */
  var proxyTarget   = moduleOptions.target;


  if(!proxy){

    proxy = httpProxy.createProxyServer({
      target: proxyTarget
    });

    proxy.on('proxyReq', function(proxyReq, req, res) {
      proxyReq.setHeader('Access-Control-Allow-Origin', proxyTarget);

      console.log(chalk.green('[Proxy]'), 'Request made to:', proxyTarget + req.url);
    });

    proxy.on('error', function(error, req, res) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });

      console.error(chalk.red('[Proxy]'), error);
    });
  }


  /*
   * The proxy middleware is an Express middleware added to BrowserSync to
   * handle backend request and proxy them to your backend.
   */
  function proxyMiddleware(req, res, next) {
    /*
     * This test is the switch of each request to determine if the request is
     * for a static file to be handled by BrowserSync or a backend request to proxy.
     *
     * The existing test is a standard check on the files extensions but it may fail
     * for your needs. If you can, you could also check on a context in the url which
     * may be more reliable but can't be generic.
     */
    if (moduleOptions.regexNext.test(req.url)
      || req.url == "/"
      || (/^(?=.*\bcompany\b)(?=.*\burl\b).*$/.test(req.url) && req.url.indexOf('app/setup') == -1))  {
      next();
    } else {
      proxy.web(req, res);
    }
  }

  var proxies = [];
  if(moduleOptions.isEnabled){
    proxies = [proxyMiddleware];
  }

  return proxies;
};
