const highRankingDropdown = document.querySelector("#filterDropdown");

highRankingDropdown.addEventListener("change", function () {
  const selectedOption = highRankingDropdown.value;

  if (selectedOption === "all") {
    fetchHighRankingDestinations();
  } else {
    fetchHighRankingDestinationsByType(selectedOption);
  }
});


if (filterDropdown) {
    filterDropdown.addEventListener("change", function () {
      const selectedOption = filterDropdown.value;
  
      if (selectedOption === "all") {
        fetchHighRankingDestinations();
      } else {
        fetchHighRankingDestinationsByType(selectedOption);
      }
    });
  }
  
  

  const displayHighRankingDestinations = (highRankingDestinations) => {
    const highRankingPlaces = document.querySelector("#high-ranking-places");
  
    if (highRankingPlaces && highRankingDestinations) {
      highRankingPlaces.innerHTML = ""; 
  
      highRankingDestinations.map((destination) => {
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
        highRankingPlaces.appendChild(holdingDiv);
    
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
    //     highRankingPlaces.appendChild(destinationCard);
    //   });
    }
  };
  
  
  const fetchHighRankingDestinations = () => {
    axios
      .get(`${baseUrl}/api/destinations`)
      .then((res) => {
        const allDestinations = res.data;
        
  
        const highRankingDestinations = allDestinations.filter(
          (destination) => destination.ranking > 5
        );
        
  
        displayHighRankingDestinations(highRankingDestinations);
      })
      .catch((err) => console.error(err));
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    fetchHighRankingDestinations();
  });

  

  const fetchHighRankingDestinationsByType = (type) => {
    axios
      .get(`${baseUrl}/api/destinations?type=${type}`)
      .then((res) => {
        const highRankingDestinations = res.data.filter(
          (destination) => destination.ranking > 5
        );
        displayHighRankingDestinations(highRankingDestinations);
      })
      .catch((err) => console.error(err));
  };
  
  
  document.addEventListener("DOMContentLoaded", () => {
    fetchHighRankingDestinations();
  });
