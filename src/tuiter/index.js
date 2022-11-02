import React from "react";
import ExploreComponent from "./explore";
import NavigationSidebar from "./navigation-sidebar";
import WhoToFollowList from "./who-to-follow-list";
import Home from "./home/index";
import { Link } from "react-router-dom";
import Nav from "../nav";
import whoReducer from "./who-to-follow-list/who-reducer";
import tuitsReducer from "./tuits/tuits-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
const store = configureStore({
  reducer: { who: whoReducer, tuits: tuitsReducer },
});

function Tuiter() {
  return (
    <Provider store={store}>
      <div>
        <Nav></Nav>
        <h1>Tuiter</h1>
      </div>
      <div className="row mt-2">
        <div className="col-2 col-md-2 col-lg-1 col-xl-2">
          <NavigationSidebar active="home" />
        </div>
        <div
          className="col-10 col-md-10 col-lg-7 col-xl-6"
          style={{ position: "relative" }}
        >
          <Home />
          {/* <ExploreComponent /> */}
        </div>
        <div className="d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4">
          <WhoToFollowList />
        </div>
      </div>
    </Provider>
  );
}

export default Tuiter;
