var songs = [];

songs[0] = ["Legs", "ZZTop", "Eliminator", "rock"];
songs[1] = ["The Logical Song", "Supertramp", "Breakfast in America", "rock"];
songs[2] = ["Another Brick in the Wall", "Pink Floyd", "The Wall", "rock"];
songs[3] = ["Welcome to the Jungle","Guns & Roses", "Appetite for Destruction", "rock"];



var buildSongString = function(myArray) {
  mySongs = "";
  for (var i = 0; i < myArray.length; i++) {

   mySongs += "<section><p class='title'>" + myArray[i][0] + "</p>";
   mySongs += "<ul class='song'>";
   mySongs += "<li>" + myArray[i][1] + "</li>";   // Artist name
   mySongs += "<li>" + myArray[i][2] + "</li>";   // Album name
   mySongs += "<li>" + myArray[i][3] + "</li>";   // Song genre
   mySongs += "</ul></section>";
  }
   return mySongs;

}


var displaySongs = function(myArray, myId) {
  songSpot = document.getElementById(myId);

  songSpot.innerHTML = buildSongString(myArray);
}

displaySongs(songs, "songchart");