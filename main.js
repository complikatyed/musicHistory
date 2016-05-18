'use strict';

 let songsArray = [];
 let editId = "";


$(document).ready(function(){

// ****************************  'List Songs' FUNCTIONS  ****************************** //

 getAllSongDataFromFirebase();

  function getAllSongDataFromFirebase() {

    clearArray();

    $.ajax({
      url:"https://kmrmusichistory.firebaseio.com/songs/.json",
      success: onLoadSuccess
    });
  };

  // ---------- Display 'songchart' and hide other page sections ---------- //

  function showSongList() {
    $("#view-editMusic").addClass("hidden");
    $('#view-addMusic').addClass("hidden");
    $("#view-listMusic").addClass("visible");
    $("#view-listMusic").removeClass("hidden");
  }

  // ---------- Listener for the 'List Music' button ---------- //

  $("#link-listMusic").click(function(event) {

    event.preventDefault();
    showSongList();
    getAllSongDataFromFirebase();

  });

  // ---------- Converts Firebase JSON data from objects to arrays ---------- //

  function gatherStoredSongData(songs) {

    for (let song in songs) {

      let storedSong = [];

      storedSong.push(songs[song].title);
      storedSong.push(songs[song].artist);
      storedSong.push(songs[song].album);
      storedSong.push(songs[song].genre);
      storedSong.push(song);

      songsArray.push(storedSong);
    };

    buildSongCardsFromObject();
  };

  // ---------- Builds 'mySongs' string based on the songsArray ---------- //

  function buildSongCardsFromObject() {

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

      showSongs(mySongs, "#songchart");
  };

  // ---------- Adds song sections to the DOM ---------- //

  function showSongs(myString, myId) {

    $(myId).html(myString);

    $('.del_button').on('click', function() {
       deleteSong(event);
    });

    $('.edit_button').on('click', function() {
      editSong(event);
    });

  };

  // ---------- Clear songsArray (to avoid data repeat in DOM) ---------- //

  function clearArray() {
    songsArray = [];
  };

// ****************************  'ADD' FUNCTIONS  ****************************** //

  // ---------- Display add form and hide other page sections ---------- //

  function showAddForm() {
    $("#view-editMusic").addClass("hidden");
    $("#view-listMusic").addClass("hidden");
    $('#view-addMusic').addClass("visible");
    $('#view-addMusic').removeClass("hidden");
  }

  // ---------- Listener for the 'Add Music' button ---------- //

  $("#link-addMusic").click(function() {
    clearInputs();
    showAddForm();
  });

  // ---------- Capture values from user 'add songs' input ---------- //

  function getNewSongData() {

    var newSong = {
    "title": $("#songTitle").val(),
    "artist": $("#songArtist").val(),
    "album": $("#songAlbum").val(),
    "genre": $("#songGenre").val().toLowerCase()
    };

    return newSong;
  };

  // ---------- 'Enter' keypress during Add ---------- //

  $('#view-addMusic').keypress(function(e) {
    if(e.which == 13) {}
  });

  // ---------- Listener for the 'Add' button ---------- //

  $("#addBtn").click(function() {

    let newSong = getNewSongData();

    sendNewDataToFirebase(newSong);
    getAllSongDataFromFirebase();
    showSongList();

  });

  // ---------- Send new song information to Firebase ---------- //

  function sendNewDataToFirebase(newSong) {
    $.ajax({
        url:"https://kmrmusichistory.firebaseio.com/songs/.json",
        type: "POST",
        data: JSON.stringify(newSong)
      }).done(function() {});
  };

  // ---------- Clear inputs from add form ---------- //

  function clearInputs() {

    $("#songTitle").attr("placeholder", "").val("");
    $("#songArtist").attr("placeholder", "").val("");
    $("#songAlbum").attr("placeholder", "").val("");
    $("#songGenre").attr("placeholder", "").val("");

  };

// ****************************  'EDIT' FUNCTIONS  ****************************** //

  // ---------- Grabs relevant song id when 'edit' button is clicked --------- //

  function editSong(event) {

    let thisSong = event.target.closest("section");

    let songId = thisSong.getAttribute('id').split("--")[1];

    getEditDataFromFirebase(songId);

  };

  // ----------- GETs individual song data from Firebase  ----------- //

  function getEditDataFromFirebase(songId) {

    $.ajax({
        url:"https://kmrmusichistory.firebaseio.com/songs/" + songId + ".json",
        type: "GET"
      }).done(function(data) {

        fillEditPlaceholders(data, songId);
      });
  };

  // ---------- Fill edit form w placeholders (existing song data) ---------- //

  function fillEditPlaceholders(data, songId) {

    clearInputs();

    $("#view-listMusic").addClass("hidden");

    $("#editedSongTitle").attr("placeholder", data.title);
    $("#editedSongArtist").attr("placeholder", data.artist);
    $("#editedSongAlbum").attr("placeholder", data.album);
    $("#editedSongGenre").attr("placeholder", data.genre);

    showEditForm();

    $("#songTitle").focus();

    editId = songId;
  };

  // ---------- Display edit form and hide other page sections ---------- //

  function showEditForm() {
    $("#view-addMusic").addClass("hidden");
    $("#view-listMusic").addClass("hidden");
    $('#view-editMusic').addClass("visible");
    $('#view-editMusic').removeClass("hidden");
  }

  // ---------- Listener for the main edit form button ---------- //

  $("#editBtn").click(function() {

    let editedSong = getEditedSongData(editId);

    sendEditedSongToFirebase(editedSong, editId);
    showSongList();

  });

  // ---------- Allows user to press "enter" to submit data ---------- //

  $('#view-editMusic').keypress(function(e) {
    if(e.which == 13) {

    event.preventDefault();

      let editedSong = getEditedSongData(editId);

      sendEditedSongToFirebase(editedSong, editId);
      showSongList();
    }
  });

  // ---------- Captures new (or old) values from edit form input ---------- //

  function getEditedSongData(editId) {

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

  // ----------- Sends edited data with PUT to Firebase ----------- //

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

// ****************************  'DELETE' FUNCTIONS  ****************************** //

  // ---------- Grabs relevant song id in preparation for deleting --------- //

  function deleteSong(event) {

    let thisSong = event.target.closest("section");

    let songId = thisSong.getAttribute('id').split("--")[1];

    $( thisSong ).empty();
    songsArray.splice(songId, 1);
    removeDataFromFirebase(songId);
  };

  // ----------- Sends DELETE call to Firebase ----------- //

  function removeDataFromFirebase(songId) {

    $.ajax({
        url:"https://kmrmusichistory.firebaseio.com/songs/" + songId + ".json",
        type: "DELETE"
      });
  };

// ****************************  XHR/AJAX  ****************************** //

  function onLoadSuccess(data){
    gatherStoredSongData(data);
  }

  function onLoadFailure(){
    alert("Well, that didn't work.");
  }

});
