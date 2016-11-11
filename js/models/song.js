const Song = (function createSong(){
  var id = 0;
  return class {
    constructor(name, album, spotify_url, preview_url){
      this.name = name
      this.album = album
      this.spotify_url = spotify_url
      this.preview_url = preview_url
      //et cetera 
      this.id = ++id
      store().songs.push(this)
    }
  }
}())
