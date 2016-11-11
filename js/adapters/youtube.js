// AIzaSyCVhtKbqqUK6f56QCySSGZ4qvhOf9rWXDM

function ytSearch(input){
  $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/youtube/v3/search?order=viewCount&q=${input}+official+song+music+video&type=video&key=AIzaSyCVhtKbqqUK6f56QCySSGZ4qvhOf9rWXDM&part=snippet`,
            success: function(data) {
              data.items.find(function(item){
                return item.snippet.title.match(title)
              }) 

              new Video(data.items[0].id.videoId)
              // debugger
          }

  }).done(appendVideo)

}

