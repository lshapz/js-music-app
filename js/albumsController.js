function showAlbums(){
  $('div#albumsList').remove()
  $('div#albums').append("<div id='albumsList'>")
  $('div#albumsList').append(`<h2>Albums:</h2>`)
  $('div#albumsList').append('<ol id="albums">')

  var artist_spot_id = this.url.split("/")
  artist_spot_id = artist_spot_id[artist_spot_id.length - 2]
  var artistsAlbums = albumStore.filter(function(album){
    return album.artist.spot_id === artist_spot_id
  })

  artistsAlbums.forEach(album=>{
    $('#albumsList').append(`<li id="${album.name.split(' ').join('')}"><a href="#" onclick="getAlbum('${album.spot_id}')">${album.name}</a></li>`)
  })
}

function showAlbum(){

  var spot_id = this.url.split("/")
  var album = albumStore.filter(function(album){
    return album.spot_id === spot_id[spot_id.length - 1]
  })
  album = album[0]

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
