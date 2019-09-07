
/**
 * Main JS file. Contents of this file will be executed top to bottom each time the page is loaded
 * 
 * I'm doing everything in here using "vanilla JS", ie "javascript without any other libraries".
 * I'm directly accessing the DOM (the browsers tree of html elements), rather than using an abstraction like in React.
 * Still, this should give a basic idea.
 */

let circlesContainer;

async function initialize() {
  // store a reference to the circles container html element. I don't want to have to find it every time
  circlesContainer = document.getElementById('circles-container');

  // Here I'm telling the browser to execute a function each time the button is clicked.
  document.getElementById('add-button').addEventListener('click', addCircle); 

  // fetch initial circles from the server, and render them on the page
  const circles = await request({method: 'GET', url: 'http://127.0.0.1:5000/circles'});
  circles.map(circle => renderCircle(circle.id));
}

function renderCircle(id) {
  let newCircle = document.createElement('div');
  newCircle.className = 'circle green red-hover'; // add css classes to this element so it's styled like the other circles
  newCircle.innerHTML = id; // show the id on the circle
  newCircle.dataset.id = id // store id on element, so we can use it to delete it later

  newCircle.addEventListener('click', event => removeCircle(event, id));

  // add the new circle to the page
  circlesContainer.appendChild(newCircle);

  lastCircle = newCircle;
}

async function addCircle() {
  // make db request to add a new circle.
  // we don't have anything unique really about the circles other than the id, i just send up
  // an arbitrary message here :shrug:
  const newCircle = await request({
    method: 'POST',
    url: 'http://127.0.0.1:5000/circles',
    data: { message: 'idk'}
  });

  renderCircle(newCircle.id);
}

/**
 * Remove circle from the backend, and upon success remove it from the frontend
 */
async function removeCircle(event, id) {
  await request({method: 'DELETE', url: `http://127.0.0.1:5000/circles/${id}`});
  event.toElement.remove();
}

/**
 * Helper function to make XHR requests in vanilla js
 * @param {*} options url options: 
 *    - method (http method)
 *    - url
 *    - data
 */
function request(options) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open(options.method, options.url);
    xhr.onload = () => {
      if (xhr.status > 300) {
        alert('Something went wrong lol');
        return;
      }

      const responseData = JSON.parse(xhr.response);
      resolve(responseData);
    }

    // send data if we provide it, otherwise just make the request
    const data = options.data ? JSON.stringify(options.data) : undefined;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(data);
  });
}

initialize();
