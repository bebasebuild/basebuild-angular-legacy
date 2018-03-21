module.exports = {
  "env": {
    "browser": true,
    "jasmine" : true,
    "shared-node-browser" : true,
    "node" : true
  },
  "extends": "eslint:recommended",
  "plugins": [],
  "rules": {
    "no-console"     : 0,
    "linebreak-style": [
      "error",
      "unix"
    ],
    "semi": [
      "error",
      "always"
    ]
  },
  "globals" : {
    angular: true,
    module: true
  }
};