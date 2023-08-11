const destinations = [
    {
        id: 1,
        name: "Koh Phi Phi, Thailand",
        type: "Beach",
        ranking: 6,
        image: "https://telegra.ph/file/282716e1d8de50149a5bd.jpg",
        isVisited: false,
      },
      {
        id: 2,
        name: "New York City, USA",
        type: "Urban",
        ranking: 7,
        image: "https://i.natgeofe.com/n/874df281-d3e0-489a-98c0-6b840023b828/newyork_NationalGeographic_2328428.jpg",
        isVisited: false,
      },
      {
        id: 3,
        name: "Banff National Park, Canada",
        type: "Nature",
        ranking: 6,
        image: "https://w.forfun.com/fetch/5d/5dd7e7270077cdf2d1e9201fd229f460.jpeg",
        isVisited: false,
      },
      {
        id: 4,
        name: "Machu Picchu, Peru",
        type: "Culture",
        ranking: 7,
        image: "https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666399221_42-mykaleidoscope-ru-p-machu-pikchu-nasledie-yunesko-krasivo-53.jpg",
        isVisited: false,
      },

      {
        id: 5,
        name: "Bora Bora, French Polynesia",
        type: "Beach",
        ranking: 3,
        image: "https://www.tahiti.com/images1/gallery/Four-Seasons-Resort-Bora-Bora-Overwater-Bungalows-2000x1200%20(3)_29556.jpg",
        isVisited: false,
      },
      {
        id: 6,
        name: "Tokyo, Japan",
        type: "Urban",
        ranking: 6,
        image: "https://madetrip.ru/wp-content/uploads/2022/03/tokio-4.jpeg",
        isVisited: false,
      },
      {
        id: 7,
        name: "Yosemite National Park, USA",
        type: "Nature",
        ranking: 5,
        image: "https://mtdata.ru/u1/photoF357/20222186123-0/original.jpg",
        isVisited: false,
      },
      {
        id: 8,
        name: "Rome, Italy",
        type: "Culture",
        ranking: 4,
        image: "https://colosseumrometickets.com/wp-content/uploads/2018/06/Aerial-view-of-the-Colosseum-known-as-Amphitheatrum-Flavium-symbol-of-the-city-of-Rome-of-Italy-and-one-of-the-seven-wonders-of-the-world.-In-ancient-times-it-was-used-for-gladiatorial-shows..jpg",
        isVisited: false,
      },
      {
        id: 9,
        name: "London, England",
        type: "Urban",
        ranking: 4,
        image: "https://windowman.ru/wp-content/uploads/6/f/3/6f3a99a668461d28907654d824224d01.jpeg",
        isVisited: false,
      },
      {
        id: 10,
        name: "Cairo, Egypt",
        type: "Culture",
        ranking: 3,
        image: "https://singbiker.files.wordpress.com/2012/07/img_1760-55x29.jpg",
        isVisited: true,
      },
      {
        id: 11,
        name: "Lofoten, Norway",
        type: "Nature",
        ranking: 8,
        image: "https://s1.1zoom.ru/b5050/474/Norway_Lofoten_Mountains_Reine_From_above_592346_1920x1200.jpg",
        isVisited: false,
      },
      {
        id: 12,
        name: "Crimea, Russia/Ukraine",
        type: "Beach",
        ranking: 9,
        image: "https://kartinkin.net/pics/uploads/posts/2022-07/1657758258_69-kartinkin-net-p-peschanie-plyazhi-krima-priroda-krasivo-fo-72.jpg",
        isVisited: true,
      },
    ];

    const galleries = [
      {
        id: 1,
        name: "Crimea, Russia/Ukraine",
        img1: "https://topgide.ru/wp-content/uploads/2022/10/IMG_20221002_185426-1536x1153.jpg",
        img2: "https://krot.info/uploads/posts/2021-11/1638273146_57-krot-info-p-plyazhi-krima-krasivie-foto-61.jpg",
        img3: "http://s3.fotokto.ru/photo/full/728/7283329.jpg",
        img4: "https://vse-pro-kur.ru/wp-content/uploads/1/5/1/151599a4bee73b0cfd22dc66f07844a2.jpeg",
      },
      {
        id: 2,
        name: "Cairo, Egypt",
        img1: "https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-b699be21-9419-4d6f-be96-c94dedb44777",
        img2: "https://sportishka.com/uploads/posts/2022-03/1646085183_17-sportishka-com-p-sharmel-sheikh-yegipet-turizm-krasivo-foto-20.jpg",
        img3: "https://gas-kvas.com/en/uploads/posts/2022-07/1657268058_5-gas-kvas-com-p-beautiful-places-and-sights-of-the-city-si-5.jpg",
        img4: "https://unigid.com/wp-content/uploads/2021/03/luksor-raspolozhen-na-beregu-nila-1536x1025.jpg",
      }
    ]
    
  
let destinationId = 13;
let galleryId = 3
  
module.exports = {

    getGalleries: (req, res) => {
      res.status(200).send(galleries) 
    },
   

    getDestinations: (req, res) => {
        const { type } = req.query;
        if (type && type !== "all") {
          const filteredDestinations = destinations.filter(
            (destination) => destination.type === type
          );
          res.status(200).send(filteredDestinations);
        } else {
          res.status(200).send(destinations);
        }
      },

      addGallery: (req, res) => {
        const { id, name, img1, img2,img3,img4 } = req.body; 
        const newGallery = {
          id: galleryId,
          name,
          img1,
          img2,
          img3,
          img4
        };
        galleries.push(newGallery);
        res.status(200).send(newGallery); 
        galleryId++;
      },
                            
    addDestination: (req, res) => {
      const { name, type, ranking, image } = req.body;
      const newDestination = {
        id: destinationId,
        name,
        type,
        ranking,
        image,
        isVisited: false
      };
      destinations.push(newDestination);
      res.status(200).send(destinations);
      destinationId++;
    },

    updateGallery: (req, res) => {
      const {id} = req.params;
      const {name, img1, img2, img3, img4} = req.body;
      const ind = galleries.findIndex((gallery) => gallery.id === +id);
      if (ind === -1) {
        res.status(404).send("Gallery not found")
        return;
      }
      galleries[ind] = {
        id: +id,
        name,
        img1,
        img2,
        img3,
        img4
      }
      res.status(200).send(galleries)
    },
  
    updateDestination: (req, res) => {
      const { id } = req.params;
      const { name, type, ranking, image, isVisited } = req.body;
      const index = destinations.findIndex((destination) => destination.id === +id);
      if (index === -1) {
        res.status(404).send("Destination not found");
        return;
      }
      destinations[index] = {
        id: +id,
        name,
        type,
        ranking,
        image,
        isVisited: isVisited
      };
      res.status(200).send(destinations);
    },

    deleteGallery: (req, res) => {
      const {id} = req.params;
      const ind = galleries.findIndex((gallery) => gallery.id === +id);
      if (ind === -1) {
        res.status(400).send("Gallery not found")
        return
        }
        galleries.splice(ind,1);
        res.status(200).send(galleries)
      },
  
    deleteDestination: (req, res) => {
      const { id } = req.params;
      const index = destinations.findIndex((destination) => destination.id === +id);
      if (index === -1) {
        res.status(404).send("Destination not found");
        return;
      }
      destinations.splice(index, 1);
      res.status(200).send(destinations);
    },
    getHighRankingDestinations: (req, res) => {
      const highRankingDestinations = destinations.filter(
        (destination) => destination.ranking > 5
      );
      res.status(200).send(highRankingDestinations);
    },
    getVisitedDestinations: (req, res) => {
      const visitedDestinations = destinations.filter(
        (destination) => destination.isVisited === true
      );
      res.status(200).send(visitedDestinations)
    }
    
  };
  