'use strict'

$(document).ready(function(){

  let songsArray = [];

  // -------------------- Event listeners for the 'List Music' and 'Add Music' buttons -------- //

  $("#link-addMusic").click(function() {
    $("#view-listMusic").addClass("hidden");

    $('#view-addMusic').addClass("visible");
    $('#view-addMusic').removeClass("hidden");

  });




  // -------------------- Capture values from user "add songs" input  ---------------------- //

  var getSongs = function() {
    let title = $("#songTitle").value;
    let artist = $("#songArtist").value;
    let album = $("#songAlbum").value;
    let genre = $("#songGenre").value.toLowerCase();

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

    $("#songTitle").value = "";
    $("#songArtist").value = "";
    $("#songAlbum").value = "";
    $("#songGenre").value = "";

  }

  // -------------------- Event listener for the "Add" button -------------------------- //


  $("#addBtn").click(function() {

    getSongs();
    clearInputs();

    $('#view-addMusic').addClass("hidden");
    $('#view-addMusic').removeClass("visible");

    $("#view-listMusic").addClass("visible");
    $("#view-listMusic").removeClass("hidden");

  });
});



