'use strict'

 // ------- Dynamically adds event listeners to all the delete buttons --------------- //

  var addListenersToDeleteButtons = function() {

    // ----- Says look for the elements we need based on the class name -------- //
    // ----- (the class was assigned when the song string got built) ---------- //
    // ----- (the string gets built in buildSongCardsFromObject function) ----- //

    let deleteButtonListener = document.getElementsByClassName("del_button");

    // ---- "For as many items you find w the class of 'del_button'..." ----- //

    for (let i = 0; i < deleteButtonListener.length; i++) {

       // ----- each time, add a delete button and label it with the index number ----- //

       let deleteButton = deleteButtonListener[i];

       // ----- adds an event listener to each of those delete buttons added above ----- //
       // ----- and then calls deleteSong when any of those button are clicked --------- //

       deleteButton.addEventListener("click", deleteSong);
     };
  };

// ------- Function that deletes selected message from DOM and master songs array --------- //

  var deleteSong = function(event) {

    // ----- Finds where the songs are being added to the DOM ----- //
    let songChart = document.getElementById("songchart");

    // ----- Locate the section (beginning of the song's data) closest to the clicked button ----- //
    let thisSong = event.target.closest("section");

    // ----- Get the id of that particular song by splitting on the '--' and keeping the 2nd piece of the split ----- //
    // ----- We do this step so we'll have the song id when we go to remove it from the array two steps later ------- //
    let songId = thisSong.getAttribute('id').split("--")[1];

    // ----- Take this section (the individual song and all of its data) OUT of the DOM ----- //
    songChart.removeChild(thisSong);

    // ----- Remove that particular song from the array by splicing at that id and removing just one element ----- //
    songsArray.splice(songId, 1);

  };
