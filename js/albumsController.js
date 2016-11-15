function showAlbums(){
  $('div#albumsList').remove()
  $('div#albums').append("<div id='albumsList'>")
  $('div#albumsList').append(`<h3>Albums:</h3>`)

  if (store().artist.albums.length === 0) {
    $('div#albumsList').append('<h6>This artist has no albums on Spotify</h6>')
  } else {

    $('div#albumsList').append('<ol id="albums">')

    //Extracts the offset from the url
    var offset = this.url.split("&")[0].split("?")[1].slice(7)
    //Extracts the artist's spot_id from the url
    var artist_spot_id = this.url.split("/")
    artist_spot_id = artist_spot_id[artist_spot_id.length - 2]

    //Finds all of the albums associated with the artist
    var artistsAlbums = store().artist.albums.filter(function(album){
      return album.artist.spot_id === artist_spot_id
    })

    //Create list items for each album
    artistsAlbums.forEach(album=>{
      album_name_regex = album.name.replace(/[^a-zA-Z\d:]/g, '')
      $('#albumsList').append(`<li id="${album_name_regex}"><a href="javascript:" onclick="getAlbum('${album.spot_id}')"><button type="button">${album.name}</button></a></li>`)

      $(`#${album_name_regex}`).hover(
        function(){
          $('#artist img').attr('src', `${album.imageUrl}`)
        },
        function(){
          $('#artist img').attr('src', `${store().artist.image_url}`)
        }
      )
    })

    //Add a link to display more albums
    $('#albumsList').append(`<a id='more' href='javascript:' onclick='getArtistAlbums("${artist_spot_id}", "${offset}")'>More</a>`)
  }
}

function showAlbum(){

  //Extracts the artist's spot_id from the url
  var spot_id = this.url.split("/")

  //Finds the album in the artists albums array
  var album = store().artist.albums.find(function(album){
    return album.spot_id === spot_id[spot_id.length - 1]
  })
  // debugger
  //
  $('div#album').remove()
  $('div#albumsList').empty()
  $('div#albumsList').append("<div id='album'>")
  // $('div#album').append(`<br><img src='${album.imageUrl}'>`)
  $('div#albumsList').prepend("<a id='back' href='#' onclick='searchArtist()'><button type='button'>< Back to All Albums</button></a>")
  $('div#album').append(`<h2>${album.name}</h2>`)
  $('div#album').append(`<h3>Released: ${album.releaseDate}</h3>`)
  $('div#album').append('<ol id="album-list">')
  album.songs.forEach( song =>{
    let artist_name_regex = store().artist.name.replace(/[^a-zA-Z\d:]/g, '')
    let song_name_regex = song.name.replace(/[^a-zA-Z\d\s:]/g, '')
    $('#album-list').append(`
      <li id="${song_name_regex}">
        <h6>${song.name}</h6>

        <a target="_blank" href="${song.spotify_url}">
          <img class="icon" style="width: 5%;" src="assets/spotify_icon.png" title="Listen on Spotify">
        </a>

        <a href="#" onclick="ytSearch('${artist_name_regex}', '${song_name_regex}')">
          <img class="icon" style="width: 5%;" src="assets/youtube_icon.png" title="See a youtube karaoke(?) video">
        </a>

        <a href="#preview" onclick="appendPreview('${song.name.replace(/['"]/g, "")}','${song.preview_url}')">
          <img class="icon" style="width: 5%;" src="assets/preview_icon.png" title="Get a 30 second preview">
        </a>

        <a href="#lyrics" onclick="lyricSearch('${store().artist.name}', '${song.name.replace(/[^a-zA-Z\d\s:]/g, '')}')">
          <img class="icon" style="width: 5%;" src="assets/lyrics_icon.png" title="Get Lyrics">
        </a>
      </li>`)
  })
}
