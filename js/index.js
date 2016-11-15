function showSongs(){
  $('div#spotify').empty()
  $('div#spotify').append('<h3>Top Tracks</h3>')
  $('div#spotify').append('<ol id="top-tracks">')
  store().songs.forEach(song=>{
    let artist_name_regex = store().artist.name.replace(/[^a-zA-Z\d:]/g, '')
    let song_name_regex = song.name.replace(/[^a-zA-Z\d\s:]/g, '')
    $('#top-tracks').append(`
      <li id="${song_name_regex}">
        <h6>${song.name}</h6>

        <a target="_blank" href="${song.spotify_url}">
          <img class="icon" style="width: 5%;" src="assets/spotify_icon.png" title="Listen on Spotify">
        </a>

        <a href="#" onclick="ytSearch('${artist_name_regex}', '${song_name_regex}')">
          <img class="icon" style="width: 5%;" src="assets/youtube_icon.png" title="See a youtube karaoke(?) video">
        </a>

        <a href="#preview" onclick="appendPreview('${song.name.replace(/['"]/g, "")}','${song.preview_url}')">
          <img class="icon" style="width: 5%;" src="assets/preview_icon.png" title="Get a 30 second preview">
        </a>

        <a href="#lyrics" onclick="lyricSearch('${store().artist.name}', '${song.name.replace(/[^a-zA-Z\d\s:]/g, '')}')">
          <img class="icon" style="width: 5%;" src="assets/lyrics_icon.png" title="Get Lyrics">
        </a>
      </li>
    `)
  })

}


function displayArtistInfo() {
  var artist = store().artist
  $('div#artist').empty()
  $('div#artist').append(`<h1>${artist.name}</h1>`)
  $('div#artist').append(`<img src="${artist.image_url}" style="width:70%">`)
  $('.test').css('background', `url(${artist.image_url}`)
  getRelatedArtists(artist.spot_id)
}

function appendVideo(){
    if (!$('div#youtube').html().includes(store().video.youtubeid))
      {   $('div#youtube').html(`<iframe id="existing-iframe-example"
        width="640" height="360"
        src='https://www.youtube.com/embed/${store().video.youtubeid}'
        frameborder="0"
        style="border: solid 4px #37474F"></iframe>`) }
    else {
      $('div#youtube').html('<img src="assets/logo.png" style="width: 640px; height: 360px;">')
    }
}

function appendRelatedArtist(name){
  $('div#related-artists').append(`<li><a href="javascript:" onclick="searchRelatedArtist('${name.replace(/[^a-zA-Z\d\s:]/g, '')}')">${name}</a></li>`)
}

function appendPreview(song_name, preview_url){
  if (!$(`#preview`).html().includes(song_name) ){
     $(`#preview`).html(`<br><p>${song_name}</p><video controls="" name="media"><source src="${preview_url}" type="audio/mpeg"></video>`)
  }
  else {
    $(`#preview`).empty()
  }
}

function showLyrics(){

  var snippet = store().lyrics.snippet
  var url = store().lyrics.lyrics_url
  var title = store().lyrics.title.split(' ').join('')
  // debugger
  // if ($(`div#lyrics`).length === 0) {

  if (!$(`div#lyrics`).html().includes(url)) {
    $(`div#lyrics`).html(`<br><p><a target="_blank" href="${url}">${snippet}</a></p>`)
  }
  else {
    $('div#lyrics').empty()
  }

  // }
  // else {
  //   // $(`p#{title}`).remove()
  // }

}

function showSearchTracks(){
  $('div#spotify').empty()
  $('.test').css('background', "")
  $('div#middle').empty()
  $('div#spotify').append(`<h3>You searched for ${$("#song_name").val()}:</h3>`)
  $('div#spotify').append('<ol id="top-tracks">')
  store().songs.forEach(song=>{
    let artist_name_regex = song.artist_name.replace(/[^a-zA-Z\d:]/g, '')
    let song_name_regex = song.name.replace(/[^a-zA-Z\d\s:]/g, '')
    $('#top-tracks').append(`
      <li id="${song_name_regex}">
        <h6>${song.name} by <a href="#" onclick="searchRelatedArtist('${song.artist_name}')">${song.artist_name}</a></h6>

        <a target="_blank" href="${song.spotify_url}">
          <img class="icon" style="width: 5%;" src="assets/spotify_icon.png" title="Listen on Spotify">
        </a>

        <a href="#" onclick="ytSearch('${artist_name_regex}', '${song_name_regex}')">
          <img class="icon" style="width: 5%;" src="assets/youtube_icon.png" title="See a youtube karaoke(?) video">
        </a>

        <a href="#preview" onclick="appendPreview('${song.name.replace(/['"]/g, "")}','${song.preview_url}')">
          <img class="icon" style="width: 5%;" src="assets/preview_icon.png" title="Get a 30 second preview">
        </a>

        <a href="#lyrics" onclick="lyricSearch('${song.artist_name}', '${song.name.replace(/[^a-zA-Z\d\s:]/g, '')}')">
          <img class="icon" style="width: 5%;" src="assets/lyrics_icon.png" title="Get Lyrics">
        </a>
      </li>
    `)
  })

}
