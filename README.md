Component build as a node module for frontend projects based on AngularJS

## Inspiration
Take a generic build solution as a component to never stop the build evolution, only change the version ;)

## References
Base build angular is based at 0.11.0 version of [gulp-angular](https://github.com/Swiip/generator-gulp-angular/releases) yeoman generator with some improvements.

## Install 
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

***Run***
`gulp [task]`

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
