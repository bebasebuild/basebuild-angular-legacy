### Documentation, Announcements and support [here](https://basebuild-angular.readme.io/).

```
  ____                 _           _ _     _         _                      _            
 | __ )  __ _ ___  ___| |__  _   _(_) | __| |       / \   _ __   __ _ _   _| | __ _ _ __ 
 |  _ \ / _` / __|/ _ \ '_ \| | | | | |/ _` |_____ / _ \ | '_ \ / _` | | | | |/ _` | '__|
 | |_) | (_| \__ \  __/ |_) | |_| | | | (_| |_____/ ___ \| | | | (_| | |_| | | (_| | |   
 |____/ \__,_|___/\___|_.__/ \__,_|_|_|\__,_|    /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|   
                                                                |___/                    
```

> Build tool for AngularJS projects. Gulp scripts as a component! \o/

[![basebuild](https://img.shields.io/badge/basebuild-angular-red.svg?style=flat-square)](https://www.npmjs.com/package/basebuild-angular)
[![npm version](https://img.shields.io/npm/v/basebuild-angular.svg?style=flat-square)](https://www.npmjs.com/package/basebuild-angular)
[![npm downloads](https://img.shields.io/npm/dt/basebuild-angular.svg?style=flat-square)](https://www.npmjs.com/package/basebuild-angular)
[![npm downloads](https://img.shields.io/npm/dm/basebuild-angular.svg?style=flat-square)](https://www.npmjs.com/package/basebuild-angular)


## Description
Build tool for AngularJS projects as a [node module](https://www.npmjs.com/package/basebuild-angular) to be reusable and able to update. Write once, use everywhere! ;)

## Installation
```
[sudo] npm install basebuild-angular --save
```


## Usage
In your `gulpfile` you can declare the options which you want to use or modify in basesebuild. To start you only need to `require` `basebuild-angular` passing the options as parameter.

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
* *rev* : add a hash in the file names to prevent browser cache problems
* *watch* : watch your source files and recompile them automatically
* *Unit test (karma)* : out of the box unit test configuration with karma
* *e2e test (protractor)* : out of the box e2e test configuration with protractor
* *browser sync* : full-featured development web server with livereload and devices sync
* *angular-templatecache* : all HTML partials will be converted to JS to be bundled in the application

## Built-in Supported Technologies
- Gulp
- Bower
- BrowserSync
- Javascript
- CoffeeScript
- CJSX
- AngularJs
- SASS

## Stats
[![NPM](https://nodei.co/npm-dl/basebuild-angular.png?months=3&height=3)](https://nodei.co/npm/basebuild-angular/)
[![NPM](https://nodei.co/npm/basebuild-angular.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/basebuild-angular/)


## Credit
Based on [gulp-angular](https://github.com/Swiip/generator-gulp-angular/releases/tag/v0.11.0) yeoman generator with my improvements.
