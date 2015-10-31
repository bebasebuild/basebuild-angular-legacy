> Build tool for AngularJS projects as a node module to be reusable, easy maintenance and able to update.

## Inspiration
Take a generic build solution as a component to never stop the build evolution, only change the version ;)

## References
Base build angular is based at 0.11.0 version of [gulp-angular](https://github.com/Swiip/generator-gulp-angular/releases) yeoman generator with some improvements.

## Installation
`[sudo] npm install basebuild-angular`


## Usage
***Gulpfile***
```javascript

// Basic options
// =========================
var options = {
  mainAngularModule : 'BaseBuildSample'
};


// Base build modules
// ==========================
options.modulesData = {
  proxy: {
    target: 'http://docker:49000'
  }
}

// Init basebuild
// ==========================
require('basebuild-angular')(options);

```

## Use Gulp tasks

* `gulp` or `gulp build` to build an optimized version of your application in `/dist`
* `gulp serve` or `gulp dev` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode
* `gulp protractor` to launch your e2e tests with Protractor
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files


## Tasks
***Main Tasks***
- dev || serve
- build
- test
- watch
- docs

***Aux Tasks***
- serve:dist
- serve:e2e
- serve:e2e-dist
- partials
- copyEnviroments
- copyEnviroments:tmp
- html
- templates:tmp
- bower:tmp
- fonts
- fonts:tmp
- other
- other:tmp
- clean
- webdriver-update
- webdriver-standalone
- protractor
- protractor:src
- protractor:dist
- inject
- scripts
- cjsx
- styles
- test:auto
- watchTests
- clean:docs
