'use strict';

$(document).ready(function(){

  let songsArray = [];


  // -------------------- Event listeners for the 'Add Music' button ------------------ //

  $("#link-addMusic").click(function() {
    $("#view-listMusic").addClass("hidden");

    $('#view-addMusic').addClass("visible");
    $('#view-addMusic').removeClass("hidden");

  });

  // -------------------- Event listener for the "List Music" button -------------------------- //

  $("#link-listMusic").click(function(event) {

    event.preventDefault();

    $('#view-addMusic').addClass("hidden");

    $("#view-listMusic").addClass("visible");
    $("#view-listMusic").removeClass("hidden");

    $.ajax({
      url:"https://kmrmusichistory.firebaseio.com/songs/.json",
      success: onLoadSuccess
    });

  });


  // -------------------- Event listener for the "Add" button ------------------ //

  $("#addBtn").click(function() {

    let newSong = getSongs();

    $.ajax({
        url:"https://kmrmusichistory.firebaseio.com/songs/.json",
        type: "POST",
        data: JSON.stringify(newSong)
      }).done(function() {
        console.log("It worked!");
      })

    clearInputs();

    $('#view-addMusic').addClass("hidden");
    $('#view-addMusic').removeClass("visible");

    $("#view-listMusic").addClass("visible");
    $("#view-listMusic").removeClass("hidden");

  });

// ------------ Event listener for the "More" button ----------------------------- //

  var addListenerToMoreButton = function() {

    $("#showMore").click(function() {
      $.ajax({
        url:"moreSongs.json",
        success: onLoadSuccess
      })
    });
  };

  // ---------- Capture values from user "add songs" input  ---------------------- //

  var getSongs = function() {

    var newSong = {
    "title": $("#songTitle").val(),
    "artist": $("#songArtist").val(),
    "album": $("#songAlbum").val(),
    "genre": $("#songGenre").val().toLowerCase()
    };
    //var inputArray = [];

    // ----- create a new song array (that will go in the songs array)

    //inputArray.push(title, artist, album, genre);

    // ----- add new song array to the master songs array

    //songsArray.push(inputArray);

    //buildSongCardsFromObject();

    return newSong;
  };

  // -------------------- Clear 'Add Songs' input boxes ----------------------------- //

  var clearInputs = function() {

    $("#songTitle").value = "";
    $("#songArtist").value = "";
    $("#songAlbum").value = "";
    $("#songGenre").value = "";

  };

  // -------------------- XHR success and failure functions ------------------------------- //

  function onLoadSuccess(data){
    gatherStoredSongData(data);
  }

  function onLoadFailure(){
    alert("Well, that didn't work.");
  }


// --------------------  Converts the JSON data from objects to arrays  -------------- //

  var gatherStoredSongData = function(songs) {

    for (let song in songs) {

      let storedSong = [];

      // ----- Pushes each piece of the song data into a new 'storedSong' array ----- //

      storedSong.push(songs[song].title);
      storedSong.push(songs[song].artist);
      storedSong.push(songs[song].album);
      storedSong.push(songs[song].genre);

      // ----- Pushes each the new individual song array into the master song array ------ //
      songsArray.push(storedSong);
    };

    buildSongCardsFromObject();
  };

// -------------------- Builds "ourSongs" string based on the songsArray -------------------- //

  var buildSongCardsFromObject = function() {

    let mySongs = "";

      for (var i = 0; i < songsArray.length; i++) {

       mySongs += "<section id='song--" + i + "'><p class='title'>" + songsArray[i][0] + "</p>";
       mySongs += "<ul class='song'>";
       mySongs += "<li>" + songsArray[i][1] + "</li>";   // Artist name
       mySongs += "<li>" + songsArray[i][2] + "</li>";   // Album name
       mySongs += "<li>" + songsArray[i][3] + "</li>";   // Song genre
       mySongs += "<li> <button id='btn--" + i + "' class='del_button'>Delete</button>";
       mySongs += "</ul></section>";
      }

      // ----- Dynamically adds the 'More' button (so it will always be at the bottom) ----- //
      mySongs += "<section><button id='showMore' class='grey_button_centered1'>More</button></section>"

      // ----- Calls the 'showSongs' function that sends the song string to the DOM ------ //
      showSongs(mySongs, "#songchart");
  };

// -------------------- Function that adds songs to the DOM -------------------------- //

  var showSongs = function(myString, myId) {

    $(myId).html(myString);

    // ----- Adds event listeners to the 'Delete'/'More' buttons after they're in the DOM ----- //
    addListenersToDeleteButtons();
    addListenerToMoreButton();

  };

  // ------- Dynamically adds event listeners to all the delete buttons --------------- //

  var addListenersToDeleteButtons = function() {


    let deleteButtonListener = document.getElementsByClassName("del_button");

    for (let i = 0; i < deleteButtonListener.length; i++) {

      let deleteButton = deleteButtonListener[i];

       deleteButton.addEventListener("click", deleteSong);
     };
  };

// ------- Function that deletes selected message from DOM and master songs array --------- //

  var deleteSong = function(event) {

    let thisSong = event.target.closest("section");

    let songId = thisSong.getAttribute('id').split("--")[1];

    $( thisSong ).empty();

    songsArray.splice(songId, 1);

  };

});
