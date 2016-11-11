const Song = (function createSong(){
  var id = 0;
  return class {
    constructor(name, album, spotify_url){
      this.name = name
      this.album = album
      this.spotify_url = spotify_url
      //et cetera 
      this.id = ++id
      stores.songs.push(this)
    }
  }
}())
