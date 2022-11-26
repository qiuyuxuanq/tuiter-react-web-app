import express from "express";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js"
import mongoose from "mongoose"
mongoose.connect('mongodb://localhost:27017/tuiter')
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
HelloController(app);
UserController(app);
TuitsController(app);
app.listen(4000);
