function showSongs(){
  $('div#spotify').empty()
  $('div#spotify').append('<h2>Top Tracks</h2>')
  $('div#spotify').append('<ol id="top-tracks">')
  store().songs.forEach(song=>{
    let artist_name_regex = store().artist.name.replace(/[^a-zA-Z\d:]/g, '')
    let song_name_regex = song.name.replace(/[^a-zA-Z\d\s:]/g, '')
    $('#top-tracks').append(`<li id="${song_name_regex}">${song.name} <a target="_blank" href="${song.spotify_url}">listen on spotify</a> <a href="javascript:" onclick="ytSearch('${artist_name_regex}', '${song_name_regex}')">Sing Karaoke</a> <a href="javascript:" onclick="appendPreview('${song_name_regex}','${song.preview_url}')">get preview</a> <a href="#" onclick="lyricSearch('${artist_name_regex}', '${song_name_regex}')">get lyrics link/snippet</a></li>`)
  })

}

function displayArtistInfo() {
  var artist = store().artist
  $('div#artist').empty()
  $('div#artist').append(`<h1>${artist.name}</h1>`)
  $('div#artist').append(`<img src="${artist.image_url}" style="height:20%;width:20%">`)
  getRelatedArtists(artist.spot_id)
}

function appendVideo(){
    $('div#youtube').empty()
    $('div#youtube').append(`<iframe id="existing-iframe-example"
        width="640" height="360"
        src='https://www.youtube.com/embed/${store().video.youtubeid}'
        frameborder="0"
        style="border: solid 4px #37474F"></iframe>`)
}

function appendRelatedArtist(name){
  $('div#related-artists').append(`<li><a href="javascript:" onclick="searchRelatedArtist('${name.replace(/[^a-zA-Z\d\s:]/g, '')}')">${name}</a></li>`)
}

function appendPreview(song, preview_url){
   $(`#preview`).html(`<video controls="" name="media"><source src="${preview_url}" type="audio/mpeg"></video>`)
}

function showLyrics(){

  var snippet = store().lyrics[store().lyrics.length-1].snippet
  var url = store().lyrics[store().lyrics.length-1].lyrics_url
  var title = store().lyrics[store().lyrics.length-1].title.split(' ').join('')
  // debugger
  if ($(`p#lyrics${title}`).length === 0) {
    $(`li#${title}`).append(`<p style="margin-right:50%" id="lyrics${title}"><a target="_blank" href="${url}">${snippet}</a></p>`)}
  else {
    $(`p#{title}`).remove()
  }

}
