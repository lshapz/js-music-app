$(function(){
  $("#submit").click(function(event){
    $('div#albums').empty()
    event.preventDefault()
    var artist = $('#artist_name').val()
    // const req = new XMLHttpRequest()
    $.ajax({
      method: "GET",
      url: `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
      success: function(data) {
        let artist = data.artists.items[0]
        new Artist(artist.name, artist.id, artist.images[0].url)
        displayArtistInfo()
        songSearch(artist.id)
        getArtistAlbums(artist.id, "first")
      }
    })
  })
})


function songSearch(spot_id) {
  $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${spot_id}/top-tracks/?country=US`,
    success: function(data){
      data.tracks.forEach(song=>{
        new Song(song.name, song.album.name, song.external_urls.spotify, song.preview_url) //
      })
    }
  }).done(showSongs)
}

function getArtistAlbums(spot_id, offset){

  if (offset === "first"){
    offset = 0
  } else {
    offset = (parseInt(offset) + 20).toString()
  }

  var uniqAlbums = []

  $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${spot_id}/albums?offset=${offset}&limit=20&album_type=album`,
    success: function(data){

      data.items.forEach( album =>{
        if (uniqAlbums.length === 0){
          uniqAlbums.push({spot_id: album.id, name: album.name, artist: store().artist})
        } else if(albumIsUniq(album)){
          uniqAlbums.push({spot_id: album.id, name: album.name, artist: store().artist})
        }
      })

      //Checks the current albums are uniqe to all the albums in the current artists albums
      uniqAlbums.forEach(album => {
        if(!exists(store().artist.albums, album)){
          new Album (album.spot_id, album.name, album.artist)
        }
        function exists(arr, album) {
          return arr.some(function(arrVal) {
            return album.name === arrVal.name;
          });
        }
      })

    }
  }).done(showAlbums).then(function(data){
    if (data.next === null){
      $('#more').remove()
    }
  })

  //Helper Function
  //This prevents duplicates
  function albumIsUniq(albumToCheck){
    let result;
    let albumToCheckRegex = albumToCheck.name.replace(/[():]/g, '')
    for (let i = 0; i < uniqAlbums.length; i++){
      let albumRegex = uniqAlbums[i].name.replace(/[():]/g, '')
      if (albumToCheckRegex.toLowerCase() === albumRegex.toLowerCase() || !!albumToCheckRegex.match(`${albumRegex}`) || !!albumRegex.match(`${albumToCheckRegex}`)){
        result = false
        break
      } else {
        result = true
      }
    }
    return result
  }

}


function getAlbum(spot_id){
  $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/albums/${spot_id}`,
    success: data => {

      // find album in store that matches the album we are searching for
      var album = store().artist.albums.find(function(album){
        return album.name === data.name
      })

      //Add release year and image to album
      album.releaseDate = data.release_date
      album.imageUrl = data.images[1].url

      //Create a new song for each song on the album and add it to the albums songs array IF it hasn't been clicked
      if (album.songs.length === 0){
        data.tracks.items.forEach( song => {
          var newSong = new Song (song.name, album, song.external_urls.spotify, song.preview_url)
          album.songs.push(newSong)
        })
      }
    }
  }).done(showAlbum) //albumController
}
