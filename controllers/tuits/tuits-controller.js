import posts from "./tuits.js";
let tuits = posts;

const createTuit = (req, res) => {
  const newTuit = req.body;
  newTuit._id = new Date().getTime() + "";
  newTuit.likes = 0;
  tuits.unshift(newTuit);
  res.json(newTuit);
};
const findTuits = (req, res) => {
  res.json(tuits);
};
const updateTuit = (req, res) => {
  const tuitdIdToUpdate = req.params.tid;
  const updates = req.body;
  tuits = tuits.map((t) => {
    if (t._id == tuitdIdToUpdate) {
      return { ...t, ...updates };
    }
    return t;
  });
  res.sendStatus(200);
};
const deleteTuit = (req, res) => {
  const tuitdIdToDelete = req.params.tid;
  tuits = tuits.filter((t) => t._id != tuitdIdToDelete);
  res.sendStatus(200);
};

export default (app) => {
  app.post("/api/tuits", createTuit);
  app.get("/api/tuits", findTuits);
  app.put("/api/tuits/:tid", updateTuit);
  app.delete("/api/tuits/:tid", deleteTuit);
};
