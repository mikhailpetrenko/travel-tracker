const express = require("express");
const cors = require("cors");
const controller = require("./controller");


const app = express();
const port = 4445;

app.use(express.json());
app.use(cors());

const {
  getDestinations,
  addDestination,
  updateDestination,
  deleteDestination,
} = require("./controller");

app.get("/api/destinations", controller.getDestinations);
app.post("/api/destinations", controller.addDestination);
app.put("/api/destinations/:id", controller.updateDestination);
app.delete("/api/destinations/:id", controller.deleteDestination);
app.get("/api/high-ranking-destinations", controller.getHighRankingDestinations);
app.get("/api/visited-destinations", controller.getVisitedDestinations)
app.get("/api/galleries", controller.getGalleries);
app.post("/api/galleries", controller.addGallery);
app.put("/api/galleries/:id", controller.updateGallery);
app.delete("/api/galleries/:id", controller.deleteGallery)


const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  
  server.on('error', (error) => {
    console.error('Server error:', error.message);
  });
  