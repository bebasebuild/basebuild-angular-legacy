/*jshint unused:false */

var proxy        = null,
    httpProxy    = require('http-proxy'),
    middlewares  = [],
    HttpProxyRules = require('basebuild-proxy-rules');

module.exports = function(options) {

  'use strict';
  var moduleOptions = options.modulesData['proxy'];
  var _             = options.plugins.lodash;
  var chalk         = options.plugins.chalk;

  /*
   * Location of your backend server
   */
  var proxyTarget   = moduleOptions.target;
  var proxyRules    = new HttpProxyRules(moduleOptions.proxyRules || {});

  /**
   * Used to test the context of request
   * @type {Regex, Function}
   */
  var preventWhen = moduleOptions.preventWhen;
  var nextTest    = null;


  /**
   * Contains all middlewares
   * @type {Array}
   */
  middlewares  = moduleOptions.middleware ? moduleOptions.middleware : [];

  var proxyRequest = _.isFunction(moduleOptions.onProxyRequest) ? moduleOptions.onProxyRequest : onProxyRequest;
  var proxyError   = _.isFunction(moduleOptions.onProxyError)   ? moduleOptions.onProxyError   : onProxyError;


  /**
   * Executed only if the module is enabled
   */
  if(moduleOptions.isEnabled){

    proxy = httpProxy.createProxyServer({
      target: proxyTarget
    });


    /**
     * Logs every request
     * @param  {Object} proxyReq Proxy request
     * @param  {Object} req      Request
     * @param  {Object} res      Response
     */
    proxy.on('proxyReq', proxyRequest);


    /**
     * Logs errors
     * @param  {Object} proxyReq Proxy request
     * @param  {Object} req      Request
     * @param  {Object} res      Response
     */
    proxy.on('error', proxyError);

    /**
     * Sets the middleware
     * @type {Array}
     */
    middlewares = [proxyMiddleware];



    /**
     * Checks the type of modulesData.proxy.next
     */
    nextTest = getValidateFunction(preventWhen, 'preventWhen');


  }

  function getValidateFunction(option, propertyLaber){
    var validateFunction = null;

    if(_.isRegExp(option)){
      validateFunction = validateRegexRequest;
    } else if(_.isFunction(option)){
      validateFunction = validateRequestFunction;
    } else {
      throw new Error(chalk.red('[Proxy] ') + 'Iligal type for property "' + propertyLaber + '"');
    }

    return validateFunction;

  }


  function validateRequestFunction(func, req, res){
    return func(req, res)
  }


  function validateRegexRequest(regex, req, res, next){
    return regex.test(req.url)
  }

  function onProxyRequest (proxyReq, req, res, options) {
    proxyReq.setHeader('Access-Control-Allow-Origin', options.target.href);
    console.log(chalk.green('[Proxy]'), 'Request made to...', chalk.magenta('host '), options.target.href, chalk.magenta(' url '), req.url);
  }

  function onProxyError(error, req, res) {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });

    console.error(chalk.red('[Proxy]'), error);
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
    var proxySettings = proxyRules.match(req) || { target: proxyTarget };
    var isStaticFile  = nextTest(preventWhen, req, res) || req.url === "/";
    if ( isStaticFile && !proxySettings.forceRequest)  {
      next();
    } else {
      proxy.web(req, res, proxySettings);
    }
  }

  return {
    middlewares             : middlewares,
    getValidateFunction     : getValidateFunction,
    validateRequestFunction : validateRequestFunction,
    validateRegexRequest    : validateRegexRequest,
    onProxyRequest          : proxyRequest,
    onProxyError            : proxyError,
    defaults: {
      middleware: proxyMiddleware
    }
  };
};
