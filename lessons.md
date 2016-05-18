## Lessons Learned

### Version Three
* Adding an array to an array works the same as adding anything else to an array.
* The structure of the single page app is pretty cool -- reminds me a bit of how RoR works
* Hadn't used overflow before -- that solved about three problems...

### Version Four
* Initially I set up the XHR in a fairly messy way.  Making the "More" button work required a refactor so that the XHR could be called by an event listener.  I honestly didn't expect the restructured code to work as easily and efficiently as it did.  Awesome feeling to see success the first time around!
* Adding event listeners to the dynamically added delete buttons followed essentially the same approach we had used in our "Chatty" group project, but I have a much more solid grasp of the dynamic add process after building it into this code.

### Versions Five and Six
* jQuery is so much fun to work with, but the translation from vanilla JavaScript to jQuery was not quite as straightforward as I was expecting it to be.  The first time around I definitely missed some things that I could have converted pretty easily if I had been thinking about them from the right angle.  After finishing the Edit functions I've been paring down the code and found several pieces that could be further streamlined.  There are probably others to continue working through, but I'm getting there.
* Adding Gulp and Sass went very smoothly, though there wasn't much to sassify in this particular project.

### Version Seven
* At this stage we moved our song data to Firebase and made the ajax calls actually `GET` and `POST` the data with Firebase URLs.  These two conversions went very smoothly and I was pleased that my original structure could be adapted so easily.
* `DELETE` was also easy to set up, but I struggled mightily with grabbing the individual song id.  It turned out that I needed to switch to a `for in` iterative approach in order to grab the id successfully.  Was incredibly annoyed to discover that instead of `song.title` or `songs[song].title` (or any of the other ideas I tried), what I actually needed was just `song` itself.
* Setting up EDIT was similarly frustrating.  Many parts went swimmingly:  was able to make the existing song data populate as placeholders and it was easy to have the data not update unless something had changed in one of the fields.  What I couldn't do was get the songId into the Firebase URL.  I ultimately had to add a `console.log()` to _every single_ edit-related function in order to find where the id was falling through the cracks.  Solving that problem felt phenomenal!
* Working currently to pare down and streamline the code.  After discussing one strategy with Steve, I'm realizing that overly streamlined code is not necessarily better than a clear, slightly less dry version.  Need to wrestle with that idea a little more, but overall I'm feeling very pleased with my success on this project.  I could not have done this a year ago.
* This last phase has been a good opportunity to learn more about hoisting.  As a last step, I reorganized my code so that the functionality would be easier to follow.  Doing so meant I had to adjust many of my function definitions.  Still not sure I have all of the nuances of hoisting down, but I definitely feel clearer about it than before working through this reorganization.
* Setting up the `enter` key functionality for _add_ and _edit_ was tricky at first because I wasn't *quite* using a form for my data submission.  Very pleased that I was able to sort that part out on my own.  Thanks, Stack Overflow!
