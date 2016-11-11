// AIzaSyCVhtKbqqUK6f56QCySSGZ4qvhOf9rWXDM

function ytSearch(userinput){
  $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/youtube/v3/search?order=viewCount&q=${userinput}+official+song&type=video&key=AIzaSyCVhtKbqqUK6f56QCySSGZ4qvhOf9rWXDM&part=snippet`,
            success: function(data) {
              new Video(data.items[0].id.videoId)
          }

  })

}

