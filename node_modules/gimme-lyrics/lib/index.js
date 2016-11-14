// Dependencies
var request = require('request');
var cheerio = require('cheerio');

/**
 *  gimme-lyrics Object
 *  gimme-lyrics is a very simple-to-use interface that provides lyrics from lyrics.com
 *
 */
var gimmeLyrics = {
  /**
   *  gimme-lyrics#fetch(artist, song, callback)
   *  Get lyrics from provided @artist and @song.
   *  After the response comes the @callback function will be called.
   *
   *  Arguments
   *    - artist: String representing the name of the artist.
   *    - song: String representing the name of the song.
   *    - callback: the callback function.
   *
   *  Returns the lyrics.
   *
   */
  getLyrics : function (artist, song, callback) {
    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(" ", 'g'), "-");
    };

    String.prototype.stripPunctuation = function() {
      var target = this;
      return target.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    };

    // The root of the lyrics URL
    var link = "http://www.lyrics.com/";

    // Prepare artist and song name for URL format
    artist = artist.stripPunctuation();
    artist = artist.replaceAll(" ", "-");
    artist = artist.toLowerCase();

    song = song.stripPunctuation();
    song = song.replaceAll(" ", "-");
    song = song.toLowerCase();

    // Put everything together for the lyric URL
    link += song + "-lyrics-" + artist + ".html";

    // Scrape the lyrics URL for the actual lyrics
    request(link, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var lyrics = $('#lyrics').text();
        if (lyrics == "")
          throw "Lyrics could not be found.";
        else {
          // Replace "Lyrics Submitted By Text"
          lyrics = lyrics.replace(lyrics.substring(lyrics.indexOf("---")), "");

          callback(null, lyrics);
        }
      }
    });
  }
};

module.exports = gimmeLyrics;
