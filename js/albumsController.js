function showAlbums(){
  $('div#albumsList').remove()
  $('div#albums').append("<div id='albumsList'>")
  $('div#albumsList').append(`<h2>Albums:</h2>`)
  $('div#albumsList').append('<ol id="albums">')

  //Extracts the offset from the url
  var offset = this.url.split("&")[0].split("?")[1].slice(7)
  //Extracts the artist's spot_id from the url
  var artist_spot_id = this.url.split("/")
  artist_spot_id = artist_spot_id[artist_spot_id.length - 2]

  //Finds all of the albums associated with the artist
  var artistsAlbums = store().artist.albums.filter(function(album){
    return album.artist.spot_id === artist_spot_id
  })

  //Create list items for each album
  artistsAlbums.forEach(album=>{
    $('#albumsList').append(`<li id="${album.name.split(' ').join('')}"><a href="#" onclick="getAlbum('${album.spot_id}')">${album.name}</a></li>`)
  })

  //Add a link to display more albums
  $('#albumsList').append(`<a id='more' href='#' onclick='getArtistAlbums("${artist_spot_id}", "${offset}")'>More</a>`)

}

function showAlbum(){

  //Extracts the artist's spot_id from the url
  var spot_id = this.url.split("/")
  
  //Finds the album in the artists albums array
  var album = store().artist.albums.find(function(album){
    return album.spot_id === spot_id[spot_id.length - 1]
  })

  $('div#album').remove()
  $('div#albums').append("<div id='album'>")
  $('div#album').append(`<img src='${album.imageUrl}'>`)
  $('div#album').append(`<h2>${album.name}</h2>`)
  $('div#album').append(`<h3>Released: ${album.releaseDate}</h3>`)
  $('div#album').append('<ol id="album-list">')
  album.songs.forEach( song =>{
    $('#album-list').append(`<li id="${song.name.split(' ').join('')}">${song.name} <a target="_blank" href="${song.spotify_url}">listen on spotify</a> <a href="#" onclick="ytSearch('${store().artist.name}', '${song.name}')">try to find on youtube</a> <a href="#" onclick="appendPreview('${song.name.split(' ').join('')}','${song.preview_url}')">get preview</a></li>`)
  })
}
