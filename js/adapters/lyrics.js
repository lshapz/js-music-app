function lyricSearch(artist, title){
  $.ajax({
        method: "GET",
        url: `http://lyrics.wikia.com/api.php?action=lyrics&artist=${artist}&song=${title}&fmt=xml&func=getSong`,
            success: function(data) {
                var snippet = data.getElementsByTagName('lyrics')[0].innerHTML
                var lyric_url = data.getElementsByTagName('url')[0].innerHTML
                new Lyric(artist, title, snippet, lyric_url)
              }
          }).done(showLyrics)

}
