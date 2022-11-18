import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTuitThunk, findTuitsThunk } from "../../services/tuits-thunks";
import { createTuit } from "../tuits/tuits-reducer";

const WhatsHappening = () => {
  const dispatch = useDispatch();
  const [newTuit, setNewTuit] = useState({ tuit: "New tuit" });
  const tuitClickHandler = () => {
    dispatch(createTuit(newTuit));
    dispatch(createTuitThunk(newTuit));
    setNewTuit({ tuit: "" });
  };

  return (
    <div className="row">
      <div className="col-auto">
        <img src="/images/nasa.png" width={60} />
      </div>
      <div className="col-10">
        <textarea
          value={newTuit.tuit}
          placeholder="What's happening?"
          className="form-control border-0"
          onChange={(e) => setNewTuit({ ...newTuit, tuit: e.target.value })}
        ></textarea>
        <div>
          <button
            className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
            onClick={tuitClickHandler}
          >
            Tuit
          </button>
          <div className="text-primary fs-2">
            <i className="bi bi-card-image me-3"></i>
            <i className="bi bi-filetype-gif me-3"></i>
            <i className="bi bi-bar-chart me-3"></i>
            <i className="bi bi-emoji-smile me-3"></i>
            <i className="bi bi-geo-alt"></i>
          </div>
        </div>
      </div>
      <div className="col-12">
        <hr />
      </div>
    </div>
  );
};
export default WhatsHappening;
