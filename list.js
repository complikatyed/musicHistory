var listLink = document.getElementById("link-list");
var listView = document.getElementById("list-view");

listLink.addEventListener("click", function(event) {
  event.preventDefault();
  addView.classList.add("hidden");

  listView.classList.add("visible");
  listView.classList.remove("hidden");
  myRequest.open("GET", "songs.json");
  //displaySongs(songs, "songchart");
});


var displaySongs = function(myArray, myId) {
  songSpot = document.getElementById(myId);

  songSpot.innerHTML = buildSongString(myArray);
}
