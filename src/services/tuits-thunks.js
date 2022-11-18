import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./tuits-service";

export const findTuitsThunk = createAsyncThunk(
  "tuits/findTuits",
  async (thunkAPI) => await service.findTuits()
);

export const deleteTuitThunk = createAsyncThunk(
  "tuits/deleteTuits",
  async (thunkAPI) => {
    await service.deleteTuit(thunkAPI);
    return await service.findTuits();
  }
);

export const createTuitThunk = createAsyncThunk(
  "tuits/createTuits",
  async (thunkAPI) => {
    await service.createTuit(thunkAPI);
    return await service.findTuits();
  }
);

export const updateTuitThunk = createAsyncThunk(
  "tuits/updateTuits",
  async (thunkAPI) => {
    await service.updateTuit(thunkAPI);
    return await service.findTuits();
  }
);
