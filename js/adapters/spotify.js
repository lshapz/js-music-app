   $(document).ready(function(){
      document.getElementById("submit").addEventListener("click", function(){
        event.preventDefault()
        var artist = $('#artist_name').val()
        const req = new XMLHttpRequest()
        let thing = []
        $.ajax({
            method: "GET",
            url: `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
            success: function(data) {
              new Artist(data);}
            })
    
    }) })

   //stealing the base code from the js-ajax 0916 lectures