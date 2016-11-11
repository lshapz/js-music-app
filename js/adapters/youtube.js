// AIzaSyCVhtKbqqUK6f56QCySSGZ4qvhOf9rWXDM

function ytSearch(artist, title){
  $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/youtube/v3/search?order=relevance&q=${artist}+${title}+official+song+music+video&type=video&key=AIzaSyCVhtKbqqUK6f56QCySSGZ4qvhOf9rWXDM&part=snippet`,
            success: function(data) {
              var video = data.items.find(function(item){
                return item.snippet.title.match(title)
              }) 
              // debugger 
              //new Video(data.items[0].id.videoId)
              new Video(video.id.videoId)
              // debugger
          }

  }).done(appendVideo)

}

