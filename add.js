'use strict'

let addLink = document.getElementById("link-addMusic");
let addView = document.getElementById("view-addMusic");

let songsArray = [];

// -------------------- Event listeners for the 'List Music' and 'Add Music' buttons -------- //

addLink.addEventListener("click", function() {
  listView.classList.add("hidden");

  addView.classList.add("visible");
  addView.classList.remove("hidden");

});

// -------------------- Capture values from user "add songs" input  ---------------------- //

var getSongs = function() {
  let title = document.getElementById("songTitle").value;
  let artist = document.getElementById("songArtist").value;
  let album = document.getElementById("songAlbum").value;
  let genre = document.getElementById("songGenre").value.toLowerCase();

  var inputArray = [];

  // ----- create a new song array (that will go in the songs array)

  inputArray.push(title, artist, album, genre);

  // ----- add new song array to the master songs array

  songsArray.push(inputArray);

  // ----- this function is defined in list.js 
  buildSongCardsFromObject(songsArray);
}

// -------------------- Clear 'Add Songs' input boxes ----------------------------- //

var clearInputs = function() {

  document.getElementById("songTitle").value = "";
  document.getElementById("songArtist").value = "";
  document.getElementById("songAlbum").value = "";
  document.getElementById("songGenre").value = "";

}

// -------------------- Event listener for the "Add" button -------------------------- //

var addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function() {

  getSongs();
  clearInputs();

  addView.classList.add("hidden");
  addView.classList.remove("visible");

  listView.classList.add("visible");
  listView.classList.remove("hidden");

});




