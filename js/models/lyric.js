const Lyric = (function createLyric(){
  var id = 0;
  return class {
    constructor(artist, title, snippet, lyrics_url){
      this.title = title
      this.artist = artist
      this.snippet = snippet
      this.lyrics_url = lyrics_url
      //et cetera 
      this.id = ++id
      store().lyrics.push(this)
    }
  }
}())
