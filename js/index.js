

function showSongs(){
  $('div#spotify').empty()
  $('div#spotify').append('<ol>')
  stores.songs.forEach(song=>{
    $('ol').append(`<li>${song.name}</li>`).append(`<a target="_blank" href="${song.spotify_url}">listen on spotify</a> <a href="#" onclick="ytSearch('${stores.artist.name}', '${song.name}')">try to find on youtube</a>`)
  })

}

function displayArtistInfo() {
  var artist = stores.artist
  $('div#artist').empty()
  $('div#artist').append(`<h1>${artist.name}</h1>`)
  $('div#artist').append(`<img src="${artist.image_url}" style="height:20%;width:20%">`)

}

function appendVideo(){
    $('div#youtube').empty()
    $('div#youtube').append(`<iframe id="existing-iframe-example"
        width="640" height="360"
        src='https://www.youtube.com/embed/${stores.video.youtubeid}'
        frameborder="0"
        style="border: solid 4px #37474F"></iframe>`)
}