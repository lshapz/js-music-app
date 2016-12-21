// AIzaSyCVhtKbqqUK6f56QCySSGZ4qvhOf9rWXDM

  function ytSearch(artist, title){
    $.ajax({
          method: "GET",
          url: `https://www.googleapis.com/youtube/v3/search?order=relevance&q=${artist}+${title}+karaoke+video&type=video&key=AIzaSyCVhtKbqqUK6f56QCySSGZ4qvhOf9rWXDM&part=snippet`,
              success: function(data) {
                new Video( data.items[0].id.videoId)
            }

    }).done(appendVideo)

  }
