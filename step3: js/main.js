
/**
 * Main JS file. Contents of this file will be executed top to bottom each time the page is loaded
 * 
 * I'm doing everything in here using "vanilla JS", ie "javascript without any other libraries".
 * I'm directly accessing the DOM (the browsers tree of html elements), rather than using an abstraction like in React.
 * Still, this should give a basic idea.
 */

let circlesContainer;
let lastCircle;

function initialize() {
  // store a reference to the circles container html element. I don't want to have to find it every time
  circlesContainer = document.getElementById('circles-container');

  // Here I'm telling the browser to execute a function each time the button is clicked.
  document.getElementById('add-button').addEventListener('click', addCircle); 
  document.getElementById('remove-button').addEventListener('click', removeCircle);

  // store a reference to the last circle on the page. Since the page starts out with a circle,
  // that's the "last" one.
  lastCircle = document.getElementsByClassName('circle')[0];
}

function addCircle() {
  let newCircle = document.createElement('div');
  newCircle.className = 'circle red green-hover'; // add css classes to this element so it's styled like the other circles

  // add the new circle to the page
  circlesContainer.appendChild(newCircle);

  lastCircle = newCircle;
}

/**
 * Remove the 'last circle', if there is one. If we didn't have this reference saved,
 * we'd have to search the page every time for the list of circles and remove the last one.
 * Searching the page for things is an expensive operation as the DOM can be quite a large tree.
 * Deleting from this reference is a quick operation.
 */
function removeCircle() {
  if (!lastCircle) {
    alert('There are no more circles silly!');
    return;
  }

  let newLastCircle = lastCircle.previousElementSibling;
  lastCircle.remove();
  lastCircle = newLastCircle;
}

initialize();
