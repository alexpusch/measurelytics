module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": "airbnb-base",
  "settings": {
    "import/ignore": [".*jaco.*"]
  },
  "globals": {
    "window": true,
    "document": true,
  },
  "rules": {
    "no-use-before-define": "off",
    'max-len': ['error', 120, 2, {
      "ignoreUrls": true,
      "ignoreComments": false,
      "ignoreRegExpLiterals": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true
    }]
  }
}
