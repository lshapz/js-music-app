// function lyricSearch(artist, title){

//   $.ajax({
//     method: "GET",
//     headers: {"Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'},
    
//         success: function(data) {
//             // var snippet = data.getElementsByTagName('lyrics')[0].innerHTML
//             // if (snippet === "Not found") {
//             //   snippet = `Lyrics to ${title} not found. Click to check the lyrics wiki.`
//             //   var lyric_url = "http://lyrics.wikia.com"
//             // } else {
//             //   var lyric_url = data.getElementsByTagName('url')[0].innerHTML
//             // }
//             debugger
//             parse(lyric_url, artist, title)
//             // new Lyric(artist, title, snippet, lyric_url)
//           }
//       }).done(showLyrics)

// } 

// let token = 'K8zOymbX1OBf5n52osfWrytwtD2_yn6XxekAW7atflHYlhEB7QdMUAnKKPCHvz4g'
// function lyricSearch(artist, title) {
//   $.ajax({
//     method: "GET",
//     data: {
//             'access_token':token
//             },
//     header: {'Authentication': 'Bearer ' + token},
//     url: `http://api.genius.com/search?q=` + artist + title,
//       success: function(result){
//        let url = result.response.hits[0].result.url
//        parse(url, artist, title)
//       }
//   })
// }

function lyricSearch(artist, title) {
  artist = artist.replace(/\bThe \b/g, '')
  artist = artist.replace(/\s/g, '_')
  // artist = artist.toLowerCase()
  title = title.replace(/\s/, '_')
  // title = title.toLowerCase()
  let new_url = 'http://lyrics.wikia.com/wiki/' + artist + ':' + title
  // debugger
$.ajax({
  url: `https://mercury.postlight.com/parser?url=` + new_url,    
  type: 'GET',
  headers: {"x-api-key": 'x9j7aC1WghE6DX5gkuTBXkrv0B13MBXzlmMvfWoB'}
}).then((response)=>
{
  
  let regex = /<(?:[^>=]|='[^']*'|="[^"]*"|=[^'"][^\s>]*)*>/g;
  let content_array = response.content.split('>')
  let content_start = content_array.indexOf(' <div class="lyricbox"')
  let content_end = content_array.indexOf(' <nav class="article-categories CategorySelect articlePage userCanEdit" id="articleCategories"')
  let just_content = content_array.splice(content_start+1, content_array.length - content_end - 1)
  
  let html_free_lyrics = just_content.join('').replace(regex, "")
  let no_lines =  html_free_lyrics.replace(/<p/g, "").replace(/<\/p/g, "").replace(/<div/g, '').replace(/<\/div/g, '')
  let no_line_array = no_lines.split(' ')
  let snippet = no_line_array.map(word=>{
    return word.split(/(?=[A-Z])/).join(' \n')

  }).join(' ')
  // debugger
  
  new Lyric(artist, title, snippet, new_url)
}
).done(showLyrics)
}

