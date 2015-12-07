[![npm version](https://badge.fury.io/js/basebuild-angular.svg)](https://badge.fury.io/js/basebuild-angular)

## Description
Build tool for AngularJS projects as a [node module](https://www.npmjs.com/package/basebuild-angular) to be reusable, easy maintenance and able to update in the way "write once, use everywhere".

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

* `gulp` or `gulp build` to build an optimized version of your application in `dist` directory
* `gulp serve` or `gulp dev` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode
* `gulp protractor` to launch your e2e tests with Protractor
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

## Features included in the gulpfile
* *useref* : allow configuration of your files in comments of your HTML file
* *ngAnnotate* : convert simple injection to complete syntax to be minification proof
* *uglify* : optimize all your JavaScript
* *csso* : optimize all your CSS
* *autoprefixer* : add vendor prefixes to CSS
* *rev* : add a hash in the file names to prevent browser cache problems
* *watch* : watch your source files and recompile them automatically
* *Unit test (karma)* : out of the box unit test configuration with karma
* *e2e test (protractor)* : out of the box e2e test configuration with protractor
* *browser sync* : full-featured development web server with livereload and devices sync
* *angular-templatecache* : all HTML partials will be converted to JS to be bundled in the application

## Stats
[![NPM](https://nodei.co/npm-dl/basebuild-angular.png?months=3&height=3)](https://nodei.co/npm/basebuild-angular/)
[![NPM](https://nodei.co/npm/basebuild-angular.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/basebuild-angular/)


## Credit
Based on v0.11.0 of [gulp-angular](https://github.com/Swiip/generator-gulp-angular/releases/tag/v0.11.0) yeoman generator with my improvements.
