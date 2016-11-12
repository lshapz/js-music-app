const Album = (function (){
  var id = 0;
  return class Album {
    constructor(spot_id, name, artist){
      this.spot_id = spot_id
      this.name = name
      this.artist = artist
      this.id = ++id
      albumStore = [...albumStore, {spot_id: spot_id, name: name, artist: artist}]
    }
  }
}())
