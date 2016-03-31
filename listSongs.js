'use strict'

let listLink = document.getElementById("link-listMusic");
let listView = document.getElementById("view-listMusic");

// -------------------- XHR success and failure functions ------------------------------- //

function onLoadSuccess(){
  var myText = JSON.parse(this.responseText);
  gatherStoredSongData(myText.songs);
}

function onLoadFailure(){
  alert("Well, that didn't work.");
}

// -------------------- XHR request converted to a re-callable function ---------------- //


function myGet(url) {
  var myRequest = new XMLHttpRequest();

  myRequest.open('GET', url, true);

  myRequest.addEventListener("load", onLoadSuccess);

  myRequest.addEventListener("error", onLoadFailure);

  myRequest.send();
}


// -------------------- Event listeners for the "View List" button -------------------------- //

listLink.addEventListener("click", function(event) {

  event.preventDefault();
  addView.classList.add("hidden");

  listView.classList.add("visible");
  listView.classList.remove("hidden");

  // ----- calls the XHR requesting function and tells it what file to grab from ----- //
  myGet("songs.json");

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

    // ----- Dynamically adds the 'More' button (so it will always be at the bottom) ----- //
    mySongs += "<section><button id='showMore' class='grey_button_centered'>More</button></section>"

    // ----- Calls the 'showSongs' function that sends the song string to the DOM ------ //
    showSongs(mySongs, "songchart");
};

// -------------------- Function that adds songs to the DOM -------------------------- //

var showSongs = function(myString, myId) {

  let songSpot = document.getElementById(myId);

  songSpot.innerHTML = myString;

  // ----- Adds event listeners to the 'Delete'/'More' buttons after they're in the DOM ----- //
  addListenersToDeleteButtons();
  addListenerToMoreButton();

};


// -------------------- Event listener for the "More" button -------------------------- //

  var addListenerToMoreButton = function() {

    let moreButton = document.getElementById("showMore");

      moreButton.addEventListener("click", function(){

        // ----- calls XHR request function and tells it to grab moreSongs.json ----- //
        myGet("moreSongs.json");
      });
  };




