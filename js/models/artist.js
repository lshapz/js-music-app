const Artist = (function createArtist(){
  var id = 0;
  return class {
    constructor(name, spot_id, image_url){
      this.spot_id = spot_id
      this.name = name
      this.image_url = image_url
      this.albums = []
      // this.popularity = popularity
      //this.image_url = image_url
      //et cetera 
      this.id = ++id
      // debugger
      stores = [...stores, {artist: this, songs: [], video: "", lyrics: []}]
    }
  }
}())
