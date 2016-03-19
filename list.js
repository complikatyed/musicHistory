'use strict'

let listLink = document.getElementById("link-list");
let listView = document.getElementById("list-view");

listLink.addEventListener("click", function(event) {
  event.preventDefault();
  addView.classList.add("hidden");

  listView.classList.add("visible");
  listView.classList.remove("hidden");
  myRequest.open("GET", "songs.json");
});


var showSongs = function(myArray, myId) {
  let songSpot = document.getElementById(myId);

  songSpot.innerHTML = buildSongsFromObject(myArray);
};
