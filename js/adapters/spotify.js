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
        new Artist(artist.name, artist.id, artist.images[0].url);
        displayArtistInfo()
        songSearch(artist.id)
        getArtistAlbums(artist.id)
      }
    })
  })
})


function songSearch(spot_id) {
  //const req = new XMLHttpRequest()
  // var artist_id = stores.artists.filter(spot_id: spot_id) // pseudocode
  $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${spot_id}/top-tracks/?country=US`,
    success: function(data){
      // var songs = data.tracks.slice()
      data.tracks.forEach(song=>{
        new Song(song.name, song.album.name, song.external_urls.spotify, song.preview_url) //
      })

    }

  }).done(showSongs)

}
//stealing the base code from the js-ajax 0916 lectures}

function getArtistAlbums(spot_id){
  var realAlbums = []
  var uniqAlbums = []
  $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${spot_id}/albums`,
    success: function(data){
      
      data.items.forEach( album =>{
        if (realAlbums.length === 0){
          realAlbums.push({spot_id: album.id, name: album.name, artist: store().artist})
        } else if(albumChecker(album)){
          realAlbums.push({spot_id: album.id, name: album.name, artist: store().artist})
        }
      })

      realAlbums.forEach( album =>{
        if (uniqAlbums.length === 0){
          // new Album (album.spot_id, album.name, album.artist)
          uniqAlbums.push(album)
        } else if (albumIsUniq(album)){
          uniqAlbums.push(album)
        }
      })

      uniqAlbums.forEach(album => {
        new Album (album.spot_id, album.name, album.artist)
      })

    }
  }).done(showAlbums) //albumController

  //Helper Functions
  //This makes sure the album is not a compilation album && is not an album that just includes the artist AKA uniqAlbums with Various Artists
  function albumChecker(albumToCheck){
    if(albumToCheck.album_type === "album" && albumToCheck.artists[0].name === store().artist.name){
      return true
    } else {
      return false
    }
  }
  //This prevents duplicates
  function albumIsUniq(albumToCheck){
    let result;
    let albumToCheckRegex = albumToCheck.name.replace(/[()]/g, '')
    for (let i = 0; i < uniqAlbums.length; i++){
      let albumRegex = uniqAlbums[i].name.replace(/[()]/g, '')
      if (!!albumToCheckRegex.match(`${albumRegex}`)){
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
