const Artist = (function createArtist(){
  var id = 0;
  return class {
    constructor(name, popularity, image_url){
      this.name = name
      this.popularity = popularity
      this.image_url = image_url
      //et cetera 
      this.id = ++id
      stores.artists.push(this)
    }
  }
}())
