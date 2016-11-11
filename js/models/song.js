const Song = (function createSong(){
  var id = 0;
  return class {
    constructor(name, spotify_url){
      this.name = name
      this.spotify_url = spotify_url
      //et cetera 
      this.id = ++id
      stores.songs.push(this)
    }
  }
}())
