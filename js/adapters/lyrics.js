function lyricSearch(artist, title){
  $.ajax({
    method: "GET",
    url: `http://lyrics.wikia.com/api.php?action=lyrics&artist=${artist}&song=${title}&fmt=xml&func=getSong`,
        success: function(data) {
            var snippet = data.getElementsByTagName('lyrics')[0].innerHTML
            if (snippet === "Not found") {
              snippet = `Lyrics to ${title} not found. Click to check the lyrics wiki.`
              var lyric_url = "http://lyrics.wikia.com"
            } else {
              var lyric_url = data.getElementsByTagName('url')[0].innerHTML
            }
            new Lyric(artist, title, snippet, lyric_url)
          }
      }).done(showLyrics)

}
