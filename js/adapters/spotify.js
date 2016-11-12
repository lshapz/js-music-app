   $(document).ready(function(){
      document.getElementById("submit").addEventListener("click", function(){
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
    }) })


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
  var uniqAlbums = []
  $.ajax({
      method: "GET",
      url: `https://api.spotify.com/v1/artists/${spot_id}/albums`,
      success: function(data){

        data.items.forEach( album =>{
          if (uniqAlbums.length === 0){
            uniqAlbums.push({spot_id: album.id, name: album.name, artist: store().artist})
          } else if(albumIsUniq(album)){
            uniqAlbums.push({spot_id: album.id, name: album.name, artist: store().artist})
          }
        })
        uniqAlbums.forEach( album =>{
          new Album (album.spot_id, album.name, album.artist)
        })
      }
  }).done(showAlbums) //albumController

  //Helper Function
  //This makes sure the album is not a compilation album && is not an album that just includes the artist AKA uniqAlbums with Various Artists && prevents duplicates
  function albumIsUniq(album){
    if(album.album_type === "album" && album.artists[0].name === store().artist.name && uniqAlbums[uniqAlbums.length - 1].name.toLowerCase() != album.name.toLowerCase()){
      return true
    } else {
      return false
    }
  }
}


function getAlbum(spot_id){
  $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/albums/${spot_id}`,
    success: data => {
      debugger
      // find album in store that matches the album we are searching for
      var album = albumStore.filter(function(album){
        return album.name === data.name
      })
      album = album[0]

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
