var lyrics = require('../lib/index.js');

lyrics.getLyrics('Drake', 'Hotline Bling', function(err, lyrics) {
  console.log(err || lyrics);
});
