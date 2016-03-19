function executeThisCodeAfterFileIsLoaded () {
  // A bit more about what `this` is here. What is the execution context?
  console.log(this.responseText);
  var myText = JSON.parse(this.responseText);
  console.log(myText);
  // Show usage of JSON.parse() here to get a POJO
}

function executeThisCodeIfXHRFails () {
  alert("Well, that didn't work.");
}

// Create an XHR object
var myRequest = new XMLHttpRequest();

// "load" means the data was successfully loaded, so the first function runs
myRequest.addEventListener("load", executeThisCodeAfterFileIsLoaded);

// "error" means the data did NOT load, so the second function (w alert) runs
myRequest.addEventListener("error", executeThisCodeIfXHRFails);

// Then tell the XHR object exactly what to do
myRequest.open("GET", "songs.json");

// Tell the XHR object to start
myRequest.send();