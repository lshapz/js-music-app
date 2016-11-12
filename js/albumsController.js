function showAlbums(){
  $('div#albums').empty()
  $('div#albums').append('<ol id="albums">')
  albumStore.forEach(album=>{
    $('#albums').append(`<li id="${album.name.split(' ').join('')}">${album.name}</li>`)
  })
}
