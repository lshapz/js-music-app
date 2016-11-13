$(document).ready(function(){
  document.getElementById("submit").addEventListener("click", function(){
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

function getRelatedArtists(spot_id) {
  $('div#related-artists').empty()
  $.ajax({
    method: "GET",
    url: `https://api.spotify.com/v1/artists/${spot_id}/related-artists`,
    success: function(data){
      data.artists.forEach((artist)=>{
        appendRelatedArtist(artist.name)
      })
    }
  })
}
