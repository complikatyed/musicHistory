'use strict';

$(document).ready(function(){

 let songsArray = [];
 let songId;

 getAllSongDataFromFirebase();


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

    getAllSongDataFromFirebase();

  });


  // -------------------- Event listener for the "Add" button ------------------ //

  $("#addBtn").click(function() {

    let newSong = getNewSongData();

    sendNewDataToFirebase(newSong);

    clearInputs();

    $('#view-addMusic').addClass("hidden");
    $('#view-addMusic').removeClass("visible");

    getAllSongDataFromFirebase();

    $("#view-listMusic").addClass("visible");
    $("#view-listMusic").removeClass("hidden");

  });
  // -------------------- Event listener for the "Add" button ------------------ //

  $("#editBtn").click(function(songId) {

    let editedSong = getEditedSongData();

    sendEditedSongToFirebase(editedSong, songId);

    $('#view-addMusic').addClass("hidden");
    $('#view-addMusic').removeClass("visible");

    $("#view-listMusic").addClass("visible");
    $("#view-listMusic").removeClass("hidden");


  });

  // ---------- Capture values from user "add songs" input  ---------------------- //

  var getNewSongData = function() {

    var newSong = {
    "title": $("#songTitle").val(),
    "artist": $("#songArtist").val(),
    "album": $("#songAlbum").val(),
    "genre": $("#songGenre").val().toLowerCase()
    };

    return newSong;

  };

  // ---------- Clear 'Add Songs' input boxes ---------- //

  var clearInputs = function() {

    $("#songTitle").value = "";
    $("#songArtist").value = "";
    $("#songAlbum").value = "";
    $("#songGenre").value = "";

  };

  // ----- Fill 'Edit Songs' w placeholder data of existing song  ---------- //

  var fillEditPlaceholders = function(data) {

    $("#view-listMusic").addClass("hidden");

    $("#songTitle").attr("placeholder", data.title);
    $("#songArtist").attr("placeholder", data.artist);
    $("#songAlbum").attr("placeholder", data.album);
    $("#songGenre").attr("placeholder", data.genre);

    $('#view-addMusic').addClass("visible");
    $('#view-addMusic').removeClass("hidden");

    $('#addBtn').addClass("hidden");
    $('#addBtn').removeClass("visible");
    $('#editBtn').addClass("visible");
    $('#editBtn').removeClass("hidden");

  };

  // ---------- Clear songsArray (to avoid data repeat in DOM) ---------- //

  function clearArray() {
    songsArray = [];
  };


  // ---------- Get song data from Firebase storage ---------- //
  function getAllSongDataFromFirebase() {

    clearArray();

    $.ajax({
      url:"https://kmrmusichistory.firebaseio.com/songs/.json",
      success: onLoadSuccess
    });
  }

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
      storedSong.push(song);

      // ----- Pushes each the new individual song array into the master song array ------ //
      songsArray.push(storedSong);
    };

    buildSongCardsFromObject();
  };

// -------------------- Builds "ourSongs" string based on the songsArray -------------------- //

  var buildSongCardsFromObject = function() {

    let mySongs = "";

      for (var i = 0; i < songsArray.length; i++) {

       mySongs += "<section id='song--" + songsArray[i][4] + "'><p class='title'>" + songsArray[i][0] + "</p>";
       mySongs += "<ul class='song'>";
       mySongs += "<li>" + songsArray[i][1] + "</li>";   // Artist name
       mySongs += "<li>" + songsArray[i][2] + "</li>";   // Album name
       mySongs += "<li>" + songsArray[i][3] + "</li>";   // Song genre
       mySongs += "<li> <button id='btn--" + i + "' class='edit_button'>Edit</button>";
       mySongs += "<li> <button id='btn--" + i + "' class='del_button'>Delete</button>";
       mySongs += "</ul></section>";
      }

      // ----- Calls the 'showSongs' function that sends the song string to the DOM ------ //
      showSongs(mySongs, "#songchart");
  };

// -------------------- Function that adds songs to the DOM -------------------------- //

  var showSongs = function(myString, myId) {

    $(myId).html(myString);

    // ----- Adds event listeners to the 'Delete'/'More' buttons after they're in the DOM ----- //
    addListenersToDeleteButtons();
    addListenersToEditButtons();

  };

  // ------- Dynamically adds event listeners to all the delete buttons --------------- //

  var addListenersToDeleteButtons = function() {

    let deleteButtonListener = document.getElementsByClassName("del_button");

    for (let i = 0; i < deleteButtonListener.length; i++) {

      let deleteButton = deleteButtonListener[i];

       deleteButton.addEventListener("click", deleteSong);
     };
  };

  // ------- Dynamically add event listeners to all the edit buttons --------------- //

  var addListenersToEditButtons = function() {

    let editButtonListener = document.getElementsByClassName("edit_button");

    for (let i = 0; i < editButtonListener.length; i++) {

      let editButton = editButtonListener[i];

       editButton.addEventListener("click", editSong);
     };
  };


// ------- Function that deletes selected message from DOM and master songs array --------- //

  var deleteSong = function(event) {

    let thisSong = event.target.closest("section");

    let songId = thisSong.getAttribute('id').split("--")[1];

    $( thisSong ).empty();
    songsArray.splice(songId, 1);
    removeDataFromFirebase(songId);
  };

// ------- Function that deletes selected message from DOM and master songs array --------- //

  var editSong = function(event) {

    let thisSong = event.target.closest("section");

    let songId = thisSong.getAttribute('id').split("--")[1];

    getEditDataFromFirebase(songId);

  };


// ----------- Get selected song from Firebase storage (prep for Edit) ----------- //

  function getEditDataFromFirebase(songId) {

    $.ajax({
        url:"https://kmrmusichistory.firebaseio.com/songs/" + songId + ".json",
        type: "GET"
      }).done(function(data) {

        fillEditPlaceholders(data, songId);

      });

  };



// ----------- Remove selected song from Firebase storage ----------- //

  function removeDataFromFirebase(songId) {

    $.ajax({
        url:"https://kmrmusichistory.firebaseio.com/songs/" + songId + ".json",
        type: "DELETE"
      });

  };

  // ---------- Capture values from user "add songs" input  ---------------------- //

  var getEditedSongData = function() {

    let editedTitle;
    let editedArtist;
    let editedAlbum;
    let editedGenre;

    if($("#songTitle").val() !== "") {
      editedTitle = $("#songTitle").val();
    } else {
      editedTitle = $("#songTitle").attr("placeholder");
    };

    if($("#songArtist").val() !== "") {
      editedArtist = $("#songArtist").val();
    } else {
      editedArtist = $("#songArtist").attr("placeholder");
    };

    if($("#songAlbum").val() !== "") {
      editedAlbum = $("#songAlbum").val();
    } else {
      editedAlbum = $("#songAlbum").attr("placeholder");
    };

    if($("#songGenre").val() !== "") {
      editedGenre = $("#songGenre").val();
    } else {
      editedGenre = $("#songGenre").attr("placeholder");
    };

    var editedSongData = {
    "title": editedTitle,
    "artist": editedArtist,
    "album": editedAlbum,
    "genre": editedGenre.toLowerCase()
    };

    return editedSongData;
  };

// ----------- Edit selected song in Firebase storage ----------- //

  function sendEditedSongToFirebase(editedSong, songId) {

    console.log("edited song", editedSong);

    $.ajax({
        url:"https://kmrmusichistory.firebaseio.com/songs/" + songId + ".json",
        type: "PUT",
        //data: JSON.stringify(editedSong)
      }).done(function() {});

  };


// ----------- Send user-added song data to Firebase storage ---------- //

  function sendNewDataToFirebase(newSong) {
    $.ajax({
        url:"https://kmrmusichistory.firebaseio.com/songs/.json",
        type: "POST",
        data: JSON.stringify(newSong)
      }).done(function() {});
  };


});
