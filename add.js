'use strict'

let addLink = document.getElementById("link-add");
let addView = document.getElementById("add-view");

addLink.addEventListener("click", function() {
  listView.classList.add("hidden");

  addView.classList.add("visible");
  addView.classList.remove("hidden");

});

var getSongs = function() {
  let title = document.getElementById("songTitle").value;
  let artist = document.getElementById("songArtist").value;
  let album = document.getElementById("songAlbum").value;
  let genre = document.getElementById("songGenre").value.toLowerCase();

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
  // this will need to be refactored eventually
  getSongs();
  clearInputs();
  showSongs(songs, "songchart");

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


var buildSongsFromObject = function(songs) {
  let ourSongs = "";

  songs.forEach(function (song, index) {
  let title  = song.title,
      artist = song.artist,
      album  = song.album,
      genre =  song.genre;

   ourSongs += "<section id='song--${index}'><p class='title'>" + title + "</p>";
   ourSongs += "<ul class='song'>";
   ourSongs += "<li>" + artist + "</li>";
   ourSongs += "<li>" + album + "</li>";
   ourSongs += "<li>" + genre + "</li>";
   ourSongs += "<li> <button id='btn--${index}' class='del_button'>Delete</button>";
   ourSongs += "</ul></section>";
  });
  return ourSongs;
}