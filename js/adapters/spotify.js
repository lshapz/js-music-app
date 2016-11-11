   $(document).ready(function(){
      document.getElementById("submit").addEventListener("click", function(){
        event.preventDefault()
        var artist = $('#artist_name').val()
        const req = new XMLHttpRequest()
        $.ajax({
            method: "GET",
            url: `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
            success: function(data) {
              var things = {spot_id: data.artists.items[0].id, name: data.artists.items[0].name}
              new Artist(things[spot_id], things[name]);
              songSearch(things[spot_id])
          }
            })
    
    }) })


songSearch function(spot_id) {
    const req = new XMLHttpRequest()
    var artist_id = stores.artists.filter(spot_id: spot_id) // pseudocode
    $.ajax({
        method: "GET",
        url: `https://api.spotify.com/v1/artists/${spot_id}/top-tracks/?country=US`
        success: function(data){
            var songs = data.slice()
            songs.forEach(song=>{

                new Song() //
            })

        }

    })

}
   //stealing the base code from the js-ajax 0916 lectures}
