
console.log(`You won't see this, because that crap doesn't work:D:D:D`);
const baseUrl = `http://localhost:4445`;

const displaySection = document.querySelector("#display-section");
const newName = document.querySelector("#newName");
const newType = document.querySelector("#newType");
const newImage = document.querySelector("#newImage");
const addForm = document.querySelector("#add-destination");
const updateForm = document.querySelector("#update-form");
const destinationId = document.querySelector("#destination-id");
const updateName = document.querySelector("#updateName");
const updateType = document.querySelector("#updateType");
const updateImage = document.querySelector("#updateImage");
const filterDropdown = document.querySelector("#filterDropdown");
let destinations = []

const deleteDestination = (id) => {
    const selectedType = filterDropdown.value;
    axios
      .delete(`${baseUrl}/api/destinations/${id}`)
      .then(() => {
        if (selectedType === "all") {
          getDestinations();
        } else {
          getDestinationsByType(selectedType);
        }
      })
      .catch((err) => console.error(err));
  };

  
  
  const createDestinationCard = (destinationArr) => {
    displaySection.innerHTML = ``;
    destinationArr.map((destination) => {
      const holdingDiv = document.createElement("div");
      holdingDiv.classList.add("destination");
      holdingDiv.classList.add(destination.type);
      holdingDiv.dataset.id = destination.id;
  
      const contentDiv = document.createElement("div");
      contentDiv.innerHTML = `
        <h2>${destination.name}</h2>
        <a href="https://www.google.com/search?q=${encodeURIComponent('travel to ' + destination.name)}" target="_blank">
        <img src="${destination.image}" alt="${destination.name}">
      </a>        
        <p class="destination-type" type="${destination.type}">${destination.type}</p>
        <p>Ranking: ${destination.ranking}</p>
      `;
  
      const actionDiv = document.createElement("div");
      actionDiv.innerHTML = `
      <button class="toggle-visited-button ${destination.isVisited ? "visited" : ""}" data-id="${destination.id}">
        ${destination.isVisited ? "✔️" : "❌"}
      </button>
        <button onclick="deleteDestination(${destination.id})">Delete</button>
        <button onclick="editDestination(${destination.id},'${destination.name}','${destination.type}','${destination.image}', ${destination.ranking})">Update</button>
      `;
  
      holdingDiv.appendChild(contentDiv);
      holdingDiv.appendChild(actionDiv);
      displaySection.appendChild(holdingDiv);
  
      const toggleButton = actionDiv.querySelector(".toggle-visited-button");
      toggleButton.onclick = () => handleToggleVisited(parseInt(destination.id, 10));

      toggleButton.addEventListener("mouseover", () => {
        const popupMessage = destination.isVisited
          ? "Press to mark UNVISITED"
          : "Press to mark VISITED";
        toggleButton.setAttribute("title", popupMessage);
      });
  
    });
  };


    

  const handleToggleVisited = (id) => {
    const destinationId = parseInt(id, 10); 
    const destination = destinations.find((dest) => dest.id === destinationId);
    if (destination) {
      destination.isVisited = !destination.isVisited;
      axios
      .put(`${baseUrl}/api/destinations/${destinationId}`, destination)
      .then((res) => {
   
        getDestinations(destinations);
      })
      .catch((err) => {
        console.error("Error updating destination:", err);
      });

    }
  };
      
  const editDestination = (id, name, type, image, ranking) => {
    const editForm = document.createElement("form");
    editForm.id = "edit-form";
    editForm.innerHTML = `
      <label for="updateName">Name:</label>
      <input type="text" id="updateName" value="${name}" />
      <br />
      <label for="updateType">Type:</label>
      <select id="updateType">
        <option value="Beach">Beach</option>
        <option value="Culture">Culture</option>
        <option value="Nature">Nature</option>
        <option value="Urban">Urban</option>
      </select>
      <br />
      <label for="updateImage">Image URL:</label>
      <input type="text" id="updateImage" value="${image}" />
      <br />
      <label for="updateRanking">Ranking:</label>
      <input type="number" id="updateRanking" value="${ranking}" />
      <br />
      <button type="button" onclick="updateDestination(${id})">Save</button>
      <button type="button" onclick="cancelEdit()">Cancel</button>
    `;
  
    const destinationDiv = document.querySelector(`.destination[data-id="${id}"]`);
    destinationDiv.appendChild(editForm);
  
    const updateType = document.querySelector("#updateType");
    updateType.value = type;

  };
  const cancelEdit = () => {
    const editForm = document.querySelector("#edit-form");
    if (editForm) {
      editForm.remove();
    }
  };
    
  const updateDestination = (id) => {
    const updateName = document.querySelector("#updateName").value;
    const updateType = document.querySelector("#updateType").value;
    const updateImage = document.querySelector("#updateImage").value;
    const updateRanking = document.querySelector("#updateRanking").value;
  
    const body = {
      name: updateName,
      type: updateType,
      image: updateImage,
      ranking: updateRanking
    };
  
    axios
      .put(`${baseUrl}/api/destinations/${id}`, body)
      .then(() => {
        cancelEdit();
        getDestinations();
      })
      .catch((err) => console.error(err));
  };
  


  const getDestinations = () => {
    axios
      .get(`${baseUrl}/api/destinations`)
      .then((res) => {
        destinations = res.data;
        createDestinationCard(destinations);
      })
      .catch((err) => console.error(err));
  };

const getDestinationsByType = (type) => {
  axios.get(`${baseUrl}/api/destinations?type=${type}`)
  .then((res) => {
    destinations = res.data; 
    createDestinationCard(destinations);
  })
  .catch((err) => console.error(err));
};


filterDropdown.addEventListener("change", function () {

  const selectedOption = filterDropdown.value;
  updateBackgroundImage(selectedOption);


  if (selectedOption === "all") {
    getDestinations();
  } else {
    getDestinationsByType(selectedOption);
  }
});

function updateBackgroundImage(selectedType) {
  const typeImages = {
    all: 'url("https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80")',
    Beach: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2346&q=80")',
    Culture: 'url("https://images.pexels.com/photos/11212909/pexels-photo-11212909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
    Nature: 'url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2348&q=80")',
    Urban: 'url("https://img001.prntscr.com/file/img001/AxNaU1mmScSyQBDhw4ypfA.jpg")',
  };

  document.body.style.backgroundImage = typeImages[selectedType];
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundAttachment = 'fixed';
}


document.addEventListener("DOMContentLoaded", getDestinations);

const addFormHandler = (e) => {
  e.preventDefault();
  const body = {
    name: newName.value,
    type: newType.value,
    ranking: 5,
    image: newImage.value,
  };
  axios
    .post(`${baseUrl}/api/destinations`, body)
    .then((res) => createDestinationCard(res.data))
    .catch((err) => console.error(err));
  newName.value = ``;
  newType.value = "Beach";
  newImage.value = ``;
};


addForm.addEventListener("submit", addFormHandler);
