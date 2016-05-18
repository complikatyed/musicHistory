'use strict';

 let songsArray = [];
 let editId = "";


$(document).ready(function(){

 getAllSongDataFromFirebase();

 var lookForEnterPress = function() {
  if ( $('#editBtn').hasClass('visible') ) {
    doEnterEdit();
  } else {
    doEnterAdd();
  }
 };

function showAddForm() {
  $("#view-editMusic").addClass("hidden");
  $("#view-listMusic").addClass("hidden");
  $('#view-addMusic').addClass("visible");
  $('#view-addMusic').removeClass("hidden");
}

function showEditForm() {
  $("#view-addMusic").addClass("hidden");
  $("#view-listMusic").addClass("hidden");
  $('#view-editMusic').addClass("visible");
  $('#view-editMusic').removeClass("hidden");
}

function showSongList() {
  $("#view-editMusic").addClass("hidden");
  $('#view-addMusic').addClass("hidden");
  $("#view-listMusic").addClass("visible");
  $("#view-listMusic").removeClass("hidden");
}

  // -------------------- Event listeners for the 'Add Music' button ------------------ //

  $("#link-addMusic").click(function() {

    clearInputs();
    showAddEditForm();
    lookForEnterPress();

  });

  // -------------------- Event listener for the "List Music" button -------------------------- //

  $("#link-listMusic").click(function(event) {

    event.preventDefault();
    showSongList();
    getAllSongDataFromFirebase();

  });


  // -------------------- Actions for "enter" during EDIT ------------------ //

  var doEnterAdd = function() {

    $('.addInput').keypress(function(e) {
      if(e.which == 13) {
        console.log("You pressed Enter to Add something");
      }
    });
  };

  var doEnterEdit = function() {

    $('.addInput').keypress(function(e) {
      if(e.which == 13) {
        console.log("You pressed Enter to Edit something");
      }
    });
  };


  // -------------------- Event listener for the "Add" button ------------------ //

  $("#addBtn").click(function() {

    let newSong = getNewSongData();

    sendNewDataToFirebase(newSong);
    getAllSongDataFromFirebase();
    showSongList();

  });


  // ---------- Event listener for the "Edit" button ---------- //

  $("#editBtn").click(function() {

    let editedSong = getEditedSongData(editId);

    sendEditedSongToFirebase(editedSong, editId);
    showSongList();

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

    $("#songTitle").attr("placeholder", "").val("");
    $("#songArtist").attr("placeholder", "").val("");
    $("#songAlbum").attr("placeholder", "").val("");
    $("#songGenre").attr("placeholder", "").val("");

  };

  // ----- Fill 'Edit Songs' w placeholder data of existing song  ---------- //

  var fillEditPlaceholders = function(data, songId) {

    clearInputs();

    $("#view-listMusic").addClass("hidden");

    $("#editedSongTitle").attr("placeholder", data.title);
    $("#editedSongArtist").attr("placeholder", data.artist);
    $("#editedSongAlbum").attr("placeholder", data.album);
    $("#editedSongGenre").attr("placeholder", data.genre);

    showEditForm();

    $("#songTitle").focus();

    lookForEnterPress();

    editId = songId;
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

    $('.del_button').on('click', function() {
       deleteSong(event);
    });

    $('.edit_button').on('click', function() {
      editSong(event);
    });

  };

// ------- Deletes selected message from DOM and master songs array --------- //

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

  var getEditedSongData = function(editId) {

    let editedTitle;
    let editedArtist;
    let editedAlbum;
    let editedGenre;

    if ($("#editedSongTitle").val() !== "") {
      editedTitle = $("#editedSongTitle").val();
    } else {
      editedTitle = $("#editedSongTitle").attr("placeholder");
    }

    if ($("#editedSongArtist").val() !== "") {
      editedArtist = $("#editedSongArtist").val();
    } else {
      editedArtist = $("#editedSongArtist").attr("placeholder");
    }

    if ($("#editedSongAlbum").val() !== "") {
      editedAlbum = $("#editedSongAlbum").val();
    } else {
      editedAlbum = $("#editedSongAlbum").attr("placeholder");
    }

    if ($("#editedSongGenre").val() !== "") {
      editedGenre = $("#editedSongGenre").val();
    } else {
      editedGenre = $("#editedSongGenre").attr("placeholder");
    }

    var editedSongData = {
    "title": editedTitle,
    "artist": editedArtist,
    "album": editedAlbum,
    "genre": editedGenre.toLowerCase()
    };

    return editedSongData;
  };

// ----------- Edit selected song in Firebase storage ----------- //

  function sendEditedSongToFirebase(editedSong, editId) {

    $.ajax({
        url:"https://kmrmusichistory.firebaseio.com/songs/" + editId + ".json",
        type: "PUT",
        data: JSON.stringify(editedSong)
      }).done(function() {

        getAllSongDataFromFirebase();
        showSongList();

      });
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
