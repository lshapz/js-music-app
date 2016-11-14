# gimme-lyrics
A small library allow a user to get the lyrics to just about any song from http://www.lyrics.com

## Installation

> npm install gimme-lyrics --save

## Usage
```javascript
var lyrics = require('gimme-lyrics');

lyrics.getLyrics('Drake', 'Hotline Bling', function(err, lyrics) {
  console.log(err || lyrics);
});
```

## Tests

> npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.

## Release History

* 0.1.0 Initial release
