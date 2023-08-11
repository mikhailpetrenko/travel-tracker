
const visitedDropdown = document.querySelector("#filterDropdown");

visitedDropdown.addEventListener("change", function () {
  const selectedOption = visitedDropdown.value;

  if (selectedOption === "all") {
    visitedDestinations();
  } else {
    visitedDestinationsByType(selectedOption);
  }
});



if (filterDropdown) {
    filterDropdown.addEventListener("change", function () {
      const selectedOption = filterDropdown.value;
  
      if (selectedOption === "all") {
        fetchVisitedDestinations();
      } else {
        fetchVisitedDestinationsByType(selectedOption);
      }
    });
  }
  
  

  const displayVisitedDestinations = (visitedDestinations) => {
    const visitedPlaces = document.querySelector("#visited-page");
  
    if (visitedPlaces && visitedDestinations) {
      visitedPlaces.innerHTML = ""; 
  
      visitedDestinations.map((destination) => {
        const holdingDiv = document.createElement("div");
        holdingDiv.classList.add("destination");
        holdingDiv.classList.add(destination.type);
        holdingDiv.dataset.id = destination.id;
    
        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
          <h2>${destination.name}</h2>
          <img src="${destination.image}" alt="${destination.name}">
          <p class="destination-type" type="${destination.type}">${destination.type}</p>
          <p>Ranking: ${destination.ranking}</p>
        `;
    
        const actionDiv = document.createElement("div");
        actionDiv.innerHTML = `
            <div class="toggle-visited-prompt ${destination.isVisited ? "visited" : "not-visited"}">
            ${destination.isVisited ? "Visited" : "Not visited yet"}</div>
            `;

    
        holdingDiv.appendChild(contentDiv);
        holdingDiv.appendChild(actionDiv);
        visitedPlaces.appendChild(holdingDiv);
    
        // const toggleButton = actionDiv.querySelector(".toggle-visited-button");
        // toggleButton.onclick = () => handleToggleVisited(parseInt(destination.id, 10));
  
        // toggleButton.addEventListener("mouseover", () => {
        //   const popupMessage = destination.isVisited
        //     ? "Press to mark UNVISITED"
        //     : "Press to mark VISITED";
        //   toggleButton.setAttribute("title", popupMessage);
        // });
    
      });
      
      
    //   forEach((destination) => {
    //     const destinationCard = document.createElement("div");
    //     destinationCard.classList.add("destination-card");
  
    //     const image = document.createElement("img");
    //     image.src = destination.image;
    //     image.alt = destination.name;
  
    //     const name = document.createElement("h3");
    //     name.textContent = destination.name;
  
    //     // Append the elements to the destination card
    //     destinationCard.appendChild(image);
    //     destinationCard.appendChild(name);
  
    //     // Append the destination card to the high ranking places section
    //     visitedPlaces.appendChild(destinationCard);
    //   });
    }
  };
  
  
  const fetchVisitedDestinations = () => {
    axios
      .get(`${baseUrl}/api/destinations`)
      .then((res) => {
        const allDestinations = res.data;
        
  
        const visitedDestinations = res.data.filter(
            (destination) => destination.isVisited === true
          );
        
  
        displayVisitedDestinations(visitedDestinations);
      })
      .catch((err) => console.error(err));
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    fetchVisitedDestinations();
  });

  

  const fetchVisitedDestinationsByType = (type) => {
    axios
      .get(`${baseUrl}/api/destinations?type=${type}`)
      .then((res) => {
        const visitedDestinations = res.data.filter(
          (destination) => destination.isVisited === true
        );
        displayVisitedDestinations(visitedDestinations);
      })
      .catch((err) => console.error(err));
  };
  
  
  document.addEventListener("DOMContentLoaded", () => {
    fetchVisitedDestinations();
  });
