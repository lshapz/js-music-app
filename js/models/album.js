const Album = (function (){
  var id = 0;
  return class Album {
    constructor(name, artist){
      this.name = name
      this.artist = artist
      this.id = ++id
      albumStore = [...albumStore, {name: name, artist: artist}]
    }
  }
}())
