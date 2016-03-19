var addLink = document.getElementById("link-add");
var addView = document.getElementById("add-view");

addLink.addEventListener("click", function() {
  listView.classList.add("hidden");

  addView.classList.add("visible");
  addView.classList.remove("hidden");

});

var getSongs = function() {
  var title = document.getElementById("songTitle").value;
  var artist = document.getElementById("songArtist").value;
  var album = document.getElementById("songAlbum").value;
  var genre = document.getElementById("songGenre").value.toLowerCase();

  var innerSong = [];

// create a new song array (that will go in the songs array)
  innerSong.push(title, artist, album, genre);

// add new song array to the master songs array
  songs.push(innerSong);
  return songs;
}

var addBtn = document.getElementById("addBtn");
// event listener listening for click on the add button
  addBtn.addEventListener("click", function() {
  getSongs();
  clearInputs();
  displaySongs(songs, "songchart");

  addView.classList.add("hidden");
  addView.classList.remove("visible");

  listView.classList.add("visible");
  listView.classList.remove("hidden");

});

var clearInputs = function() {
  document.getElementById("songTitle").value = "";
  document.getElementById("songArtist").value = "";
  document.getElementById("songAlbum").value = "";
  document.getElementById("songGenre").value = "";
}

var buildSongString = function(myArray) {
  mySongs = "";
  for (var i = 0; i < myArray.length; i++) {

   mySongs += "<section><p class='title'>" + myArray[i][0] + "</p>";
   mySongs += "<ul class='song'>";
   mySongs += "<li>" + myArray[i][1] + "</li>";   // Artist name
   mySongs += "<li>" + myArray[i][2] + "</li>";   // Album name
   mySongs += "<li>" + myArray[i][3] + "</li>";   // Song genre
   mySongs += "</ul></section>";
  }
   return mySongs;
}


var buildSongsFromObject = function(song) {
  ourSongs = "";
  var title = song.title;
  var artist = song.artist;
  var album = song.album;
  var genre = song.genre;

   ourSongs += "<section><p class='title'>" + title + "</p>";
   ourSongs += "<ul class='song'>";
   ourSongs += "<li>" + artist + "</li>";
   ourSongs += "<li>" + album + "</li>";
   ourSongs += "<li>" + genre + "</li>";
   ourSongs += "</ul></section>";

  //return ourSongs;
  console.log(ourSongs);
}