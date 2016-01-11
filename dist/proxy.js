 /*jshint unused:false */

var proxy = null;
var httpProxy = require('http-proxy');


module.exports = function(options) {

  'use strict';
  var moduleOptions = options.modulesData['proxy'];
  var _             = options.plugins.lodash;
  var chalk         = options.plugins.chalk;

  /*
   * Location of your backend server
   */
  var proxyTarget   = moduleOptions.target;

  /**
   * Used to test the context of request
   * @type {Regex, Function}
   */
  var nextOption = moduleOptions.next;
  var nextTest   = null;


  /**
   * Contains all middlewares
   * @type {Array}
   */
  var proxies = [];


  /**
   * Executed only if the module is enabled
   */
  if(!proxy && moduleOptions.isEnabled){

    proxy = httpProxy.createProxyServer({
      target: proxyTarget
    });


    /**
     * Logs every request
     * @param  {Object} proxyReq Proxy request
     * @param  {Object} req      Request
     * @param  {Object} res      Response
     */
    proxy.on('proxyReq', function(proxyReq, req, res) {
      proxyReq.setHeader('Access-Control-Allow-Origin', proxyTarget);

      console.log(chalk.green('[Proxy]'), 'Request made to:', proxyTarget + req.url);
    });


    /**
     * Logs errors
     * @param  {Object} proxyReq Proxy request
     * @param  {Object} req      Request
     * @param  {Object} res      Response
     */
    proxy.on('error', function(error, req, res) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });

      console.error(chalk.red('[Proxy]'), error);
    });

    /**
     * Sets the middleware
     * @type {Array}
     */
    proxies = [proxyMiddleware];



    /**
     * Checks the type of modulesData.proxy.next
     */
    if(_.isRegExp(nextOption)){
      nextTest = validateRegexNext;
    } else if(_.isFunction(nextOption)){
      nextTest = validateNextFunction;
    } else {
      console.error(chalk.red('[Proxy]'), 'Iligal type for property \"next\"');
    }



  }


  function validateNextFunction(req, res, next){
    return nextOption(req, res, next)
  }


  function validateRegexNext(req, res, next){
    return nextOption.test(req.url)
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
    if (nextTest(req, res, next))  {
      next();
    } else {
      proxy.web(req, res);
    }
  }

  return proxies;
};
