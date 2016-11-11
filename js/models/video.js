const Video = (function createVideo(){
  var id = 0;
  return class {
    constructor(youtubeid){
      this.youtubeid = youtubeid
      this.id = ++id
      stores.video = this
    }
  }
}())


