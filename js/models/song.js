const Song = (function createSong(){
  var id = 0;
  return class {
    constructor(name, spotify_url, artist_id){
      this.name = name
      this.spotify_url = spotify_url
      this.artist_id = artist_id
      //et cetera 
      this.id = ++id
      stores.songs.push(this)
    }
  }
}())
