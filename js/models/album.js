const Album = (function (){
  var id = 0;
  return class Album {
    constructor(spot_id, name, artist, imageUrl){
      this.spot_id = spot_id
      this.name = name
      this.artist = artist
      this.imageUrl = imageUrl
      this.songs = []
      this.id = ++id
      this.artist.albums.push(this)
    }
  }
}())

//
// Things to fix
//   1. When a song has any special characters in it (?, (), !) it messes up the li#id
//     - Use regex to only pull in A-Z characters
  // 2. Artists now have TOPsongs and songs THROUGH albums
  //3. Append the preview to a singular spot otherwise when one link is clicked on album it will append preview to that link and if it appears in top tracks
//4. Append 'Top Tracks' above the list of top tracks
//5. If you search for the same person twice it will still add them to the store
