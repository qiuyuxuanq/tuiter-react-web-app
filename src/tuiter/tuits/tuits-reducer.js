import { createSlice } from "@reduxjs/toolkit";
import tuits from "./tuits.json";
import { findTuitsThunk, deleteTuitThunk } from "../../services/tuits-thunks";
import { updateTuit } from "../../services/tuits-service";

import {
  CREATE_TUIT,
  DELETE_TUIT,
  FIND_ALL_TUITS,
  UPDATE_TUIT,
} from "./actions/tuits-actions";

const currentUser = {
  userName: "NASA",
  handle: "@nasa",
  image: "nasa.png",
};

const templateTuit = {
  ...currentUser,
  topic: "Space",
  time: "2h",
  liked: false,
  replies: 0,
  retuits: 0,
  likes: 0,
};

export const tuitsSlice = createSlice({
  name: "tuits",
  initialState: {
    tuits: tuits,
    loading: false,
  },
  extraReducers: {
    [findTuitsThunk.pending]: (state) => {
      state.loading = true;
      state.tuits = [];
    },
    [findTuitsThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tuits = payload;
    },
    [findTuitsThunk.rejected]: (state) => {
      state.loading = false;
    },
    //   [deleteTuitThunk.fulfilled]: (state, { payload }) => {
    //     state.loading = false;
    //     state.tuits = state.tuits.filter((t) => t._id !== payload);
    //   },
  },
  reducers: {
    createTuit(state, action) {
      state.tuits.unshift({
        ...action.payload,
        ...templateTuit,
        _id: new Date().getTime(),
      });
    },
    deleteTuit(state, action) {
      const { _id } = action.payload;
      const index = state.tuits.findIndex((tuit) => tuit._id == _id);
      state.tuits.splice(index, 1);
    },
    updateTuitCopy(state, action) {
      const { _id } = action.payload;
      state.tuits = state.tuits.map((tuit) =>
        tuit._id === action.payload._id ? action.payload : tuit
      );
    },
  },
});

export const { createTuit, deleteTuit, updateTuitCopy } = tuitsSlice.actions;
export default tuitsSlice.reducer;

const tuitsReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_TUIT:
      return [...state, action.newTuit];
    case UPDATE_TUIT:
      return state.map((tuit) =>
        tuit._id === action.tuit._id ? action.tuit : tuit
      );
    default: {
      return state;
    }
  }
};
// export default tuitsReducer;
