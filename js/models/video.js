const Video = (function createVideo(){
  var id = 0;
  return class {
    constructor(name, youtube_url){
      this.name = name
      this.youtube_url = youtube_url
      //et cetera 
      this.id = ++id
      stores.videos.push(this)
    }
  }
}())
