document.addEventListener("DOMContentLoaded", () => {
    getGalleries();
    getDestinationsForForm();
  
    const addGalleryForm = document.getElementById("add-gallery-form");
    if (addGalleryForm) {
      addGalleryForm.addEventListener("submit", async (event) => {
        event.preventDefault();
  
        const selectedDestination = document.getElementById("destinationSelect").value;
        
        const image1 = document.getElementById("img1").value;
        const image2 = document.getElementById("img2").value;
        const image3 = document.getElementById("img3").value;
        const image4 = document.getElementById("img4").value;



  
        const newGallery = {
          name: selectedDestination,
          img1: image1,
          img2: image2,
          img3: image3,
          img4: image4,
        };
        


  
        try {
          const response = await axios.post(`${baseUrl}/api/galleries`, newGallery);
          console.log("Server response:", response.data);

          clearAddGalleryForm();
          getGalleries();
          getDestinationsForForm()

        } catch (error) {
          console.error(error);
        }
      });
    }
  });
  
  const clearAddGalleryForm = () => {
    document.getElementById("destinationSelect").selectedIndex = 0;
    document.getElementById("img1").value = "";
    document.getElementById("img2").value = "";
    document.getElementById("img3").value = "";
    document.getElementById("img4").value = "";
  };

  const getDestinationsForForm = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/destinations`);
      const destinations = response.data;
  
      const destinationSelect = document.getElementById("destinationSelect");
      destinationSelect.innerHTML = '<option value="" disabled selected>Select Destination</option>';
      
      const galleryNames = document.querySelectorAll(".gallery-name");
      const usedDestinations = Array.from(galleryNames).map(nameElement => nameElement.textContent);
  
      for (const destination of destinations) {
        if (destination.isVisited && !usedDestinations.includes(destination.name)) {
          const option = document.createElement("option");
          option.value = destination.name;
          console.log(destination.name)
          option.textContent = destination.name;
          destinationSelect.appendChild(option);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  
const cancelUpdate = () => {
    const updateForm = document.querySelector("#update-form");
    if (updateForm) {
      updateForm.remove();
      getGalleries(); 
    }
  };
  
    const createGallery = (galleryArr) => {
    const galleriesContainer = document.querySelector("#galleries");
  
    if (galleriesContainer) {
      galleriesContainer.innerHTML = "";
  
      galleryArr.forEach((gallery) => {
        const galleryDiv = document.createElement("div");
        galleryDiv.classList.add("gallery");
        galleryDiv.dataset.id = gallery.id;

  
        for (let i = 1; i <= 4; i++) {
          const imgSrc = gallery[`img${i}`];
          if (imgSrc) {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = gallery.name + " image " + i;
            galleryDiv.appendChild(img);
          }
        }
  
        const galleryName = document.createElement("div");
        galleryName.classList.add("gallery-name");
        galleryName.textContent = gallery.name;
        galleryDiv.appendChild(galleryName);
  
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("buttons-container");
  
        const updateButton = document.createElement("button");
        updateButton.classList.add("update-button");
        updateButton.textContent = "Update";
        updateButton.dataset.id = gallery.id;
        updateButton.onclick = () => updateGallery(gallery.id); 
        buttonsDiv.appendChild(updateButton);
  
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteGallery(gallery.id); 
        buttonsDiv.appendChild(deleteButton);
  
        galleryDiv.appendChild(buttonsDiv);
  
        galleriesContainer.appendChild(galleryDiv);
      });
    }
  };
  
  const deleteGallery = (id) => {
    axios
      .delete(`${baseUrl}/api/galleries/${id}`)
      .then(() => {
        getGalleries();
        getDestinationsForForm()
      })
      .catch((err) => console.error(err));
  };
  
  const updateGallery = (id) => {
    const galleryDiv = document.querySelector(`.gallery[data-id="${id}"]`);
    const galleryName = galleryDiv.querySelector('.gallery-name');
    
    const updateForm = document.createElement("form");
    updateForm.id = "update-form";
  
    const galleryNameInput = document.createElement("input");
    galleryNameInput.type = "text";
    galleryNameInput.id = "updateGalleryName";
    galleryNameInput.value = galleryName.textContent;
    
    const imgInputContainer = document.createElement("div");
    imgInputContainer.classList.add("img-input-container");
    
    for (let i = 1; i <= 4; i++) {
      const imgInput = document.createElement("input");
      imgInput.type = "text";
      imgInput.id = `updateImg${i}`;
      imgInput.placeholder = `Image ${i} URL`;
      imgInputContainer.appendChild(imgInput);
    }
  
    const updateButton = document.createElement("button");
    updateButton.type = "button";
    updateButton.textContent = "Save";
    updateButton.onclick = () => saveGalleryUpdate(id);
  
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.onclick = cancelUpdate;
  
    updateForm.appendChild(galleryNameInput);
    updateForm.appendChild(imgInputContainer);
    updateForm.appendChild(updateButton);
    updateForm.appendChild(cancelButton);
  
    galleryDiv.innerHTML = "";
    galleryDiv.appendChild(updateForm);
  };
      
  
  const saveGalleryUpdate = (id) => {
    const updateName = document.querySelector("#updateGalleryName").value;
    const updateImg1 = document.querySelector("#updateImg1").value;
    const updateImg2 = document.querySelector("#updateImg2").value;
    const updateImg3 = document.querySelector("#updateImg3").value;
    const updateImg4 = document.querySelector("#updateImg4").value;
  
    const body = {
      name: updateName,
      img1: updateImg1,
      img2: updateImg2,
      img3: updateImg3,
      img4: updateImg4
    };
  
    axios
      .put(`${baseUrl}/api/galleries/${id}`, body)
      .then(() => {
        getGalleries();
      })
      .catch((err) => console.error(err));
  };
    
  const getGalleries = () => {
    axios
      .get(`${baseUrl}/api/galleries`)
      .then((res) => {
        allGalleries = res.data;
        console.log(allGalleries)
        createGallery(allGalleries);
      })
      .catch((err) => console.error(err));
  };
  
  document.addEventListener("DOMContentLoaded", getGalleries);
  

  const getGalleriesData = () => {
    axios
      .get(`${baseUrl}/api/galleries`)
      .then((res) => {
        allGalleries = res.data;
        createGallery(allGalleries);
      })
      .catch((err) => console.error(err));
  };
    
  const populateDestinationSelect = () => {
    const destinationSelect = document.querySelector("#destinationSelect");
    destinationSelect.innerHTML = '';
  
    destinations.forEach((destination) => {
      if (destination.isVisited && !galleryExistsForDestination(destination.name)) {
        const option = document.createElement("option");
        option.value = destination.name;
        option.textContent = destination.name;
        destinationSelect.appendChild(option);
      }
    });
  };

  