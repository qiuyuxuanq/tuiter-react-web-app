import express from "express";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js"
import mongoose from "mongoose"
import cors from "cors";
//new
// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
//     || 'mongodb://localhost:27017/tuiter'
// mongoose.connect(CONNECTION_STRING);
// mongoose.connect('mongodb://localhost:27017/tuitermongodb+srv://root:<xuan1234>@cluster0.m81cqqo.mongodb.net/?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://root:root12345678@cluster0.y77jd0u.mongodb.net/?retryWrites=true&w=majority')
const app = express();
app.use(cors());
app.use(express.json());
HelloController(app);
UserController(app);
TuitsController(app);
app.listen(4000);
