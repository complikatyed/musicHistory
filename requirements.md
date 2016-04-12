## Instructions

This project is designed to grow as students' skills develop, so each assignment builds on the previous code.  
Frequent refactoring is necessary as the requirements become more technically demanding.

### Assignment Five

This one's simple.  

Implement jQuery in your Music History code. Every innerHTML, getElementById, getElementByClassName, event listener and XHR request. Convert 'em all.


### Assignment Four

##### Part One

1. Read from local JSON file with an XHR.
1. Loop over results and inject into Music History list view.
1. Add delete button DOM to each row and, when it is clicked, delete the entire row in the DOM.

##### Part Two

1. Take your music and split it into two JSON file instead of them all living on one file.
1. Add a button at the bottom of your music list and label it "More >".
1. Load the songs from the first list and inject the DOM into the document as you've already done.
1. When the user clicks that button, load the songs from the second JSON file and append them to the bottom of the existing music, but before the More button.

---

### Assignment Three

1. In the navigation bar, make sure you have two links labeled "List Music", and "Add Music".
1. Add a DOM element that contains some input fields for the user to enter in the name of a song, the artist for the song, and the album. You do not need to enclose them in a `<form>` element because we're not actually submitting this form anywhere.
1. Add a `<button>` element at the bottom of the input fields labeled "Add".
1. The input fields and the add button make up the *Add Music View*.
1. The existing view - the combination of the filter form and the song list - will be referred to as the *List Music View*.
1. The *Add Music View* should not appear when the user first visits your page. The song list with the corresponding filter form should be visible.
1. When the user clicks on "Add Music" in the navigation bar, only the *Add Music View* should be shown ([see example wireframe](https://moqups.com/chortlehoort/1E8LJX7r/p:a0cf17f7b)).
1. When the user clicks on "List Music" in the navigation bar, only the *List Music View* should be shown ([see example wireframe](https://moqups.com/chortlehoort/1E8LJX7r/p:a8d99d401)).
1. Once the user fills out the song form and clicks the add button, you should collect all values from the input fields, add the song to your array of songs, and update the song list in the DOM.

---

### Assignment Two

Using JavaScript arrays, loops, and innerHTML, create a list of songs in the `index.html` file. Download the [`songs.js`](https://raw.githubusercontent.com/nashville-software-school/front-end-curriculum/9f5d7303f4c53102e8918f0ca06bebc84c91d266/resources/js-101.js) file, which contains an array of strings with song information.

1. Add one song to the beginning and the end of the array.
1. Must add each string to the DOM in `index.html` in the main content area.

----

### Assignment One

Recreate [Music History mockup](https://moqups.com/chortlehoort/1E8LJX7r/) in your own HTML file.

1. Create five options for the *artist select* element of any artist that you enjoy.
1. Create at least five options for the *album select* element. One, or more, album for each artist.
1. The links in the navigation bar don't need to link to anything just yet, you can use `<a href="#">View music</a>` for now
1. Pick your four favorite songs from the artists you have chosen and use the information for each in the list that's on the right-hand side. You can use `h1` tags, `div` tags, `section` tags... whatever you like.


