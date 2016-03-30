'use strict'

let listLink = document.getElementById("link-listMusic");
let listView = document.getElementById("view-listMusic");

// -------------------- Event listeners for the "View List" button -------------------------- //

listLink.addEventListener("click", function(event) {

  event.preventDefault();
  addView.classList.add("hidden");

  listView.classList.add("visible");
  listView.classList.remove("hidden");

  // ---- XHR call for the first set of songs that are stored as JSON data ---- //
  //myRequest.open("GET", "newSongs.json");


});


// --------------------  Converts the JSON data from objects to arrays  -------------- //

  var gatherStoredSongData = function(storedArray) {

    for (var i = 0; i < storedArray.length; i++) {

      let storedSong = [];

      // ----- Pushes each piece of the song data into a new 'storedSong' array ----- //
      storedSong.push(storedArray[i].title);
      storedSong.push(storedArray[i].artist);
      storedSong.push(storedArray[i].album);
      storedSong.push(storedArray[i].genre);

      // ----- Pushes each the new individual song array into the master song array ------ //
      songsArray.push(storedSong);
    };

    buildSongCardsFromObject(songsArray);
  }

// -------------------- Builds "ourSongs" string based on the songsArray -------------------- //

var buildSongCardsFromObject = function(myArray) {

  let mySongs = "";
    for (var i = 0; i < myArray.length; i++) {

     mySongs += "<section id='song--" + i + "'><p class='title'>" + myArray[i][0] + "</p>";
     mySongs += "<ul class='song'>";
     mySongs += "<li>" + myArray[i][1] + "</li>";   // Artist name
     mySongs += "<li>" + myArray[i][2] + "</li>";   // Album name
     mySongs += "<li>" + myArray[i][3] + "</li>";   // Song genre
     mySongs += "<li> <button id='btn--" + i + "' class='del_button'>Delete</button>";
     mySongs += "</ul></section>";
    }

    showSongs(mySongs, "songchart");
};

// -------------------- Event listener for the "Add" button -------------------------- //

var showSongs = function(myString, myId) {

  let songSpot = document.getElementById(myId);

  songSpot.innerHTML = myString;

};







