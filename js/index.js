function showSongs(){
  $('div#spotify').empty()
  $('div#spotify').append('<ol id="top-tracks">')
  store().songs.forEach(song=>{
    $('#top-tracks').append(`<li id="${song.name.replace(/[^a-zA-Z\d:]/g, '')}">${song.name} <a target="_blank" href="${song.spotify_url}">listen on spotify</a> <a href="javascript:" onclick="ytSearch('${store().artist.name}', '${song.name}')">try to find on youtube</a> <a href="javascript:" onclick="appendPreview('${song.name.replace(/[^a-zA-Z\d:]/g, '')}','${song.preview_url}')">get preview</a></li>`)
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
  $('div#related-artists').append(`<li><a href="javascript:" onclick="searchRelatedArtist('${name}')">${name}</a></li>`)
}

function appendPreview(song, preview_url){
  if ($(`li#${song} video`).length === 0) {
   $(`li#${song}`).append(`<video controls="" name="media"><source src="${preview_url}" type="audio/mpeg"></video>`)
  }
  else {
    $('video').remove()
  }

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