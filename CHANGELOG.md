## v0.12.3
### Fixes
Description | Commits
|---|---
Prevent proxy when request is to root path / | #25 


## v0.12.2
### Fixes
|Description|Commits
--- | --- | ---
Added treatment of warnings and errors for CoffeeScript and JavaScript - Thanks [@lucrod1](https://github.com/lucrod1) | #23 
Prevent duplicate scripts on inject | #24 


### Features
|Description|Commits
--- | --- | ---
Removing `specFiles` from src on default options | #24 

### Improvements
|Description|Commits
--- | --- | ---
Some tests | #18 

## v0.12.1
### Features
|Description|Commits
--- | --- | ---
***BREAKING CHANGE*** - [Proxy] Migrates "next" property to "preventWhen"|  #13 

### Improvements
|Description|Commits
--- | --- | ---
Some unit tests | #18 


## v0.12.0
### Fixes
|Description|Commits
--- | --- | ---
Loading all modules declared in package.json to defaultOptions.plugins | [commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/32faff548abc1260d3d693f58ad4d1d393419268)

### Features
|Description|Commits
--- | --- | ---
Creating config phase, manage the deprecated syntax (private config module) | #12 
***BREAKING CHANGE*** - [Proxy] Changing from regexNext to "next" and also support regex and function as valid value |  #13 

### Improvements
|Description|Commits
--- | --- | ---
Some unit tests | #18 
Adding an editor config file | [commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/e625d8b072049a62bb7ce6367ee3157d52accb6f)
Update README.md with new badges | [commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/a8dc4e14d735d2cee94b6c5f28a2bd20ac7cffd3)
Updates gulp-load-plugins to v1.1.0 | [commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/ee531309a4b8217befcea99c69f832d975cb02b4)
Changing package description | [commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/70341b1208e120137fdeff30f83ecc86e5940885)

## v0.11.5
### Fixes
Description|Commits
--- | --- | ---
Injection on default options for chalk and lodash plugins | [lodash commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/8aed622fd45815ab03ebf1562aed9ebfd2fd86b5) and  [chalk commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/68a6bd0a07ac67ce10756f1dd9d87076e5f17e85)
`/` bugfix for require a external module by `requireModule` method of `utils` module |[commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/052883e736b0e8e5b31e795904382ece441388c0)
Apply pattern for objects in `specFiles` | [commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/5be022e222b2f01c9bba6d0eab0dba3bb469049c)
#17 Fix `env` injection on specs | [commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/0c5b1222d39d0740c02bafa0e134f29c81e889f7)
Call `emit` function on `defaultOptions.errorHandler` only when it exists | [commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/8aed622fd45815ab03ebf1562aed9ebfd2fd86b5)

### Features
Description|Commits
--- | --- | ---
New property `excludeFiles` on `unitTests` module to exclude files in tests | [implementation](https://github.com/TimeoutZero/BaseBuildAngular/commit/0c5b1222d39d0740c02bafa0e134f29c81e889f7) and  [default options](https://github.com/TimeoutZero/BaseBuildAngular/commit/6a927fd94ee7b249d9712ac76b9b7c39766c2644)

### Improvements
Description|Commits
--- | --- | ---
Some basebuild tests with `mocha, chai and sinon` | [f5aabc6](https://github.com/TimeoutZero/BaseBuildAngular/commit/f5aabc649fb4703e4f335ce3a57f52a0e6da1384), [28740a6](https://github.com/TimeoutZero/BaseBuildAngular/commit/28740a6b9280eb0b21fb4cb5b74e15ff59d09999) and [4a51463](https://github.com/TimeoutZero/BaseBuildAngular/commit/4a51463f63b305ef69201e68447342e6d7db8a61)
Utils module coverage in 100% | [commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/a04b71417802943b2a0abd8f389de62a8868d849)
Documentation on source code for utils module | [commit](https://github.com/TimeoutZero/BaseBuildAngular/commit/92da2c2500bf2720c18ad28553c4ecbbbe389164)

***

## v0.11.0
## Features
- #11 New exclusive index injector for `.env.js` as  `<!-- inject:env -->` 
  + Scripts `.env.js`, `.dev.env.js` and `.prod.env.js` are inject in `<!-- inject:env -->`.  
- [New log name for actions](https://github.com/TimeoutZero/BaseBuildAngular/commit/f83912327bc7159b7b24e4c38cdca0cb937f6226)
- [New basebuild ASCII title showing the package version](https://github.com/TimeoutZero/BaseBuildAngular/commit/a654659022fbfd8c85d7f59affcb9cf21397496f)
- [New log pattern for modules] (https://github.com/TimeoutZero/BaseBuildAngular/commit/a654659022fbfd8c85d7f59affcb9cf21397496f)

## Breaking Changes
- #11 Removes explicit injectors for .dev* and .prod*. 
```
<!-- inject:dev --> and <!-- inject:prod --> are deprecated
```
 Now basebuild uses the same injector of the rest of js files ( `<!-- inject:js -->`) to inject `.dev*` and `.prod*` scripts. 
  

***

## v0.10.1
### Bugfixes

- [Run inject task when unlink (remove) a directory (don't need to stop the process in this case anymore)](https://github.com/TimeoutZero/BaseBuildAngular/commit/355dfe8836e8773311122785478fdcd9672b393e)

### Features

- [Access to "defaultOptions" in global options (don't need to use "require" anymore)](https://github.com/TimeoutZero/BaseBuildAngular/commit/c9aa24b6b75527d413b9e17fe07b177116cb4be8)
- [Showing the module version on initialize it](https://github.com/TimeoutZero/BaseBuildAngular/commit/c9aa24b6b75527d413b9e17fe07b177116cb4be8)
- [Access to basebuild plugins in global options (don't need to use "require" anymore)](https://github.com/TimeoutZero/BaseBuildAngular/commit/908ae15af872321ec3fe5965250d16a205963052)
- A little bit of documentation for default options on source code ([e4bf8ac](https://github.com/TimeoutZero/BaseBuildAngular/commit/e4bf8ac7fb8b35abf52b75c59549795d6152897f))
([049177e](https://github.com/TimeoutZero/BaseBuildAngular/commit/049177e0bbeb2c2933979ebefc06fc88fe1ea107))

***

## v0.9.4
### Bugfixes
- [Removing unnecessary dependence of "wrench"](https://github.com/TimeoutZero/BaseBuildAngular/commit/847e570d8ad408da2047807f222de8c0ff69e030)

***

### Features
- [Setup default task as build task](https://github.com/TimeoutZero/BaseBuildAngular/commit/2ed3cdaa4310580a696d18301984f28811fa0be8)
- [Update README.md](https://github.com/TimeoutZero/BaseBuildAngular/commit/43fad24f1ebe931218d37048b9dc00d4afb31890)

### Breaking changes
- [Removing "autoprefixer" for increase performance of the style task](https://github.com/TimeoutZero/BaseBuildAngular/commit/674fea8b69a1a27b8c5c8ecea94afc0cf1501191)

***

## v0.9.3
- [Now karma file receives all settings of unitTests module](https://github.com/TimeoutZero/BaseBuildAngular/commit/9af2903262f4a150634f5c21df7ed3ae1ba82b63)

***

## v0.9.2
- Fix for verification of karma version
- Removes karma as dependence, now karma must be installed by host project

***

## v0.9.1
Updates on karma server syntax (***not*** compatible with previous versions for `gulp test` and `gulp test:auto` tasks) 

***

## v0.8.2
Stable version - ready for development
