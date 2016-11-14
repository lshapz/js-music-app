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
   $(`li#${song}`).append(`<video controls="" autoplay="" name="media"><source src="${preview_url}" type="audio/mpeg"></video>`)
  }
  else {
    $('video').remove()
  }

}
