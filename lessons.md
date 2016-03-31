## Lessons Learned

### Version Three
* Adding an array to an array works the same as adding anything else to an array.
* The structure of the single page app is pretty cool -- reminds me a bit of how RoR works
* Hadn't used overflow before -- that solved about three problems...

### Version Four
* Initially I set up the XHR in a fairly messy way.  Making the "More" button work required a refactor so that the XHR could be called by an event listener.  I honestly didn't expect the restructured code to work as easily and efficiently as it did.  Awesome feeling to see success the first time around!
* Adding event listeners to the dynamically added delete buttons followed essentially the same approach we had used in our "Chatty" group project, but I have a much more solid grasp of the dynamic add process after building it into this code.