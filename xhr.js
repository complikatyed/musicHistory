'use strict'


function onLoadSuccess () {

  var myText = JSON.parse(this.responseText);
  gatherStoredSongData(myText.songs);
}

function onLoadFailure () {

  alert("Well, that didn't work.");

}

// Create an XHR object
var myRequest = new XMLHttpRequest();

// "load" means the data was successfully loaded, so the first function runs
myRequest.addEventListener("load", onLoadSuccess);

// "error" means the data did NOT load, so the second function (w alert) runs
myRequest.addEventListener("error", onLoadFailure);

// Then tell the XHR object exactly what to do
myRequest.open("GET", "songs.json");

// Tell the XHR object to start
myRequest.send();




