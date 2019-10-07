//Variables to store galley ID, list of 12 random users in an array,
//an index number between 0-11
let gallery = document.getElementById('gallery');
let listOfUsers = [];
let modalIndexNum;

// FetchData function that checks if there is an error
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log('Looks like there was a problem', error));
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

// FetchData URL - 12 random users with relevant information
fetchData('https://randomuser.me/api/?results=12')
  .then(data => data.results)
  .then(results => {
    //Send data to generate 12 gallery cards
    generateGallery(results);

    //Send data to an array which will hold the 12 users information
    results.forEach(user => {
      listOfUsers.push(user);
    });

    //Click event for gallery cards
    let userTiles = document.getElementsByClassName('card');
    clickEvent(userTiles);
  });

//  HELPER FUNCTION

//DISPLAY THE 12 USER DATA IN MY WEB PAGE WITH ALL THER info
function generateGallery(data) {
  let tiles = data.map(item => `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${item.picture.large}"
                    alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${item.name.first}
                    ${item.name.last}</h3>
                    <p class="card-text">${item.email}</p>
                    <p class="card-text cap">${item.location.city}</p>
                </div>
            </div>
            `).join('');
  gallery.innerHTML = tiles;
};

//Creates the modal of the clicked user with relevant information displaying
function generateModal(i) {
  let modalDiv = document.createElement('div');
  modalDiv.className = 'modal-container';
  let modalHTML = `
            <div class="modal">
                <button type="button" id="modal-close-btn"
                class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src='${listOfUsers[i].picture.large}'>
                    <h3 id="name" class="modal-name cap">
                    ${listOfUsers[i].name.first}
                    ${listOfUsers[i].name.last} </h3>
                    <p class="modal-text">${listOfUsers[i].email}</p>
                    <p class="modal-text cap">${listOfUsers[i].location.city}</p>
                    <hr>
                    <p class="modal-text">${listOfUsers[i].cell} </p>
                    <p class="modal-text">${listOfUsers[i].location.street.number}
                    ${listOfUsers[i].location.street.name},
                    ${listOfUsers[i].location.country}
                    ${listOfUsers[i].location.postcode}</p>
                    <p class="modal-text">Birthday:
                    ${listOfUsers[i].dob.date.substr(0, 10)}</p>
                </div>
            </div>`;
  modalDiv.innerHTML = modalHTML;
  document.querySelector('body').appendChild(modalDiv);

  //Click event on the "X" button to close to modal window
  let closeButton = document.querySelector('button');
  closeButton.addEventListener('click', () => {
    modalDiv.remove();
  });
}

//Click event for each user card - Once clicked sends index number of user
//card to GenerateModal function
function clickEvent(cards) {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
      generateModal(i);
    });
  }
}
